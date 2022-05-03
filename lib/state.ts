import { atom, selector } from "recoil";

export const totalBillState = atom<number>({
  key: 'totalBillState',
  default: 0,
});

export const totalPayerNumState = atom<number>({
  key: 'totalPayerNumState',
  default: 0,
});

type PayOption = {
  id: string;
  bill: number;
  payerNum: number;
}
export const payOptionsState = atom<PayOption[]>({
  key: 'payOptionsState',
  default: [],
});

export const ceilUnitState = atom<number>({
  key: 'ceilUnitState',
  default: 100,
});

export const generalPayerNumState = selector<number>({
  key: 'generalPayerNumState',
  get: ({ get }) => {
    const totalPayerNum = get(totalPayerNumState);
    const optionPayerNum = get(optionPayerNumState);
    return totalPayerNum - optionPayerNum;
  },
});

export const optionPayerNumState = selector<number>({
  key: 'optionPayerNumState',
  get: ({ get }) => {
    return get(payOptionsState).reduce((prev, option) => prev + option.payerNum, 0);
  }
});

export const generalBillState = selector<number>({
  key: 'generalTotalBillState',
  get: ({ get }) => {
    const ceilUnit = get(ceilUnitState);
    const totalBill = get(totalBillState);
    const optionTotalPay = get(optionTotalPayState);
    const generalPayerNum = get(generalPayerNumState);
    return generalPayerNum ? Math.ceil((totalBill - optionTotalPay) / generalPayerNum / ceilUnit) * ceilUnit : 0;
  }
});

export const generalTotalPayState = selector<number>({
  key: 'generalTotalPayState',
  get: ({ get }) => {
    return get(generalBillState) * get(generalPayerNumState);
  }
});

export const optionTotalPayState = selector<number>({
  key: 'optionTotalPayState',
  get: ({ get }) => {
    return get(payOptionsState).reduce((prev, option) => prev + option.bill * option.payerNum, 0);
  }
});

export const totalPayState = selector<number>({
  key: 'totalPayState',
  get: ({ get }) => {
    return get(generalTotalPayState) + get(optionTotalPayState);
  }
});

export const remainingState = selector<number>({
  key: 'remainingState',
  get: ({ get }) => {
    return get(totalPayState) - get(totalBillState);
  }
})
