import { atom, selector } from "recoil";

export const totalMoneyState = atom({
  key: 'totalMoneyState',
  default: 10000
});

export const totalPeopleNumState = atom({
  key: 'totalNumState',
  default: 2
});

export const bigMoneyState = atom({
  key: 'bigMoneyState',
  default: selector({
    key: 'bigMoneyState/default',
    get: ({ get }) => {
      const total = get(totalMoneyState);
      const peopleNum = get(totalPeopleNumState);
      return Math.ceil(total / peopleNum * 2);
    }
  })
})

export const bigMoneyPeopleNumState = atom({
  key: 'bigMoneyPeopleNumState',
  default: 0
})

export const smallMoneyState = atom({
  key: 'smallMoneyState',
  default: selector({
    key: 'smallMoneyState/default',
    get: ({ get }) => {
      const total = get(totalMoneyState);
      const peopleNum = get(totalPeopleNumState);
      return Math.ceil(total / peopleNum / 2);
    }
  })
})

export const smallMoneyPeopleNumState = atom({
  key: 'smallMoneyPeopleNumState',
  default: 0
})

export const normalMoneyState = selector({
  key: 'normalMoneyPeopleNumState',
  get: ({ get }) => {
    const total = get(totalMoneyState);
    const bigTotal = get(bigMoneyState) * get(bigMoneyPeopleNumState)
    const smallTotal = get(smallMoneyState) * get(smallMoneyPeopleNumState)
    const remaining = total - bigTotal - smallTotal;
    return Math.ceil(remaining / get(normalMoneyPeopleState));
  }
})

export const normalMoneyPeopleState = selector({
  key: 'normalMoneyState',
  get: ({ get }) => {
    return get(totalPeopleNumState) - get(bigMoneyPeopleNumState) - get(smallMoneyPeopleNumState);
  }
});


export const moneyState = selector({
  key: 'moneyState',
  get: ({ get }) => {
    const sum = {
      big: get(bigMoneyState) * get(bigMoneyPeopleNumState),
      small: get(smallMoneyState) * get(smallMoneyPeopleNumState),
    }
    return {
      total: get(totalMoneyState),
      big: get(bigMoneyState),
      small: get(smallMoneyState),
      normal: get(normalMoneyState)
    }
  }
})

export const peopleNumState = selector({
  key: 'peopleNumState',
  get: ({ get }) => {
    return {
      total: get(totalPeopleNumState),
      big: get(bigMoneyPeopleNumState),
      small: get(smallMoneyPeopleNumState),
      normal: get(normalMoneyPeopleState),
    }
  }
})

export const remainingMoneyState = selector({
  key: 'remainingMoneyState',
  get: ({ get }) => {
    const money = get(moneyState);
    const peopleNum = get(peopleNumState);
    const sum = {
      normal: money.normal * peopleNum.normal,
      big: money.big * peopleNum.big,
      small: money.small * peopleNum.small
    }
    return sum.normal + sum.big + sum.small - money.total
  }
})

export const resultState = selector({
  key: 'resultState',
  get: ({ get }) => {
    const money = get(moneyState);
    const remaining = get(remainingMoneyState);
    return {
      total: money.total,
      normal: money.normal,
      big: money.big,
      small: money.small,
      remaining: remaining,
    }
  }
})
