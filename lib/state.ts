import { atom, selector } from "recoil";

export const お会計 = atom<number>({
  key: 'お会計',
  default: 0,
});

export const 支払人数 = atom<number>({
  key: '支払人数',
  default: 0,
});

export type BillOption = {
  id: string;
  bill: number;
  payerNum: number;
}
export type RatioOption = {
  id: string;
  ratio: number;
  payerNum: number;
}
export type BasePayOption = BillOption | RatioOption
export const 調整前支払オプション = atom<BasePayOption[]>({
  key: '調整前支払オプション',
  default: [],
});

type CeilUnit = 1 | 10 | 50 | 100 | 500 | 1000;
export const isCeilUnit = (item: any): item is CeilUnit => {
  return (
    item === 1
    || item === 10
    || item === 50
    || item === 100
    || item === 500
    || item === 1000
  );
}
export const 調整前切上単位 = atom<number>({
  key: '調整前切上単位',
  default: 100,
});

export const 切上単位 = selector<CeilUnit>({
  key: '切上単位',
  get: ({ get }) => {
    const ceilUnitOrigin = get(調整前切上単位);
    if (isCeilUnit(ceilUnitOrigin)) {
      return ceilUnitOrigin;
    } else {
      return 100
    }
  }
})

export const 固定支払人数 = selector<number>({
  key: '固定支払人数',
  get: ({ get }) => {
    return get(調整前支払オプション).reduce((prev, option) => 'bill' in option ? prev + option.payerNum : prev, 0);
  }
})

export const 割合支払人数 = selector<number>({
  key: '割合支払人数',
  get: ({ get }) => {
    return get(調整前支払オプション).reduce((prev, option) => 'ratio' in option ? prev + option.payerNum : prev, 0);
  }
})

export const 固定支払総額 = selector<number>({
  key: '固定支払総額',
  get: ({ get }) => {
    return get(調整前支払オプション).reduce((prev, option) => 'bill' in option ? prev + option.bill * option.payerNum : prev, 0);
  }
});

export const お会計と固定支払総額の差額 = selector<number>({
  key: 'お会計と固定支払総額の差額',
  get: ({ get }) => {
    return get(お会計) - get(固定支払総額);
  }
})

type PayOption = {
  id: string;
  bill: number;
  ratio?: number;
  payerNum: number;
}
export const 支払オプション = selector<PayOption[]>({
  key: '支払オプション',
  get: ({ get }) => {
    const ceilUnit = get(切上単位);
    const remain = get(お会計と固定支払総額の差額);
    const payOptions = get(調整前支払オプション)
    let totalRatio = get(一般支払人数) + payOptions.reduce((prev, option) => {
      if ('ratio' in option) {
        return prev + option.ratio * option.payerNum;
      } else {
        return prev;
      }
    }, 0)

    return payOptions.map(option => {
      if ('ratio' in option) {
        return {
          id: option.id,
          payerNum: option.payerNum,
          bill: Math.ceil(remain / totalRatio * option.ratio / ceilUnit) * ceilUnit,
        }
      } else {
        return option
      }
    })
  }
})

export const 一般支払人数 = selector<number>({
  key: '一般支払人数',
  get: ({ get }) => {
    const totalPayerNum = get(支払人数);
    const optionPayerNum = get(オプション支払人数);
    return totalPayerNum - optionPayerNum;
  },
});

export const オプション支払人数 = selector<number>({
  key: 'オプション支払人数',
  get: ({ get }) => {
    return get(調整前支払オプション).reduce((prev, option) => prev + option.payerNum, 0);
  }
});

export const 一般請求額 = selector<number>({
  key: 'generalお会計',
  get: ({ get }) => {
    const ceilUnit = get(切上単位);
    const totalBill = get(お会計);
    const optionTotalPay = get(オプション支払総額);
    const generalPayerNum = get(一般支払人数);
    const generalBill = Math.ceil((totalBill - optionTotalPay) / generalPayerNum / ceilUnit) * ceilUnit;

    return generalPayerNum === 0 || generalBill < 0 ? 0 : generalBill;
  }
});

export const 一般請求総額 = selector<number>({
  key: '一般請求総額',
  get: ({ get }) => {
    return get(一般請求額) * get(一般支払人数);
  }
});

export const オプション支払総額 = selector<number>({
  key: 'オプション支払総額',
  get: ({ get }) => {
    return get(支払オプション).reduce((prev, option) => prev + option.bill * option.payerNum, 0);
  }
});

export const 支払総額 = selector<number>({
  key: '支払総額',
  get: ({ get }) => {
    return get(一般請求総額) + get(オプション支払総額);
  }
});

export const お釣り = selector<number>({
  key: 'お釣り',
  get: ({ get }) => {
    return get(支払総額) - get(お会計);
  }
})

export const queryParamsState = selector<string>({
  key: 'queryParams',
  get: ({ get }) => {
    const tb = get(お会計);
    const tp = get(支払人数);
    const c = get(切上単位);
    const op = get(調整前支払オプション);
    const opParams = op.reduce((prev, option) => {
      return prev + `&op=${'ratio' in option ? option.ratio + 'x' : option.bill},${option.payerNum}`
    }, '');

    if (tb && tp) {
      return `?tb=${tb}&tp=${tp}&c=${c}${opParams}`;
    } else {
      return '';
    }
  }
})
