import { useRecoilValue } from "recoil"
import { peopleNumState, resultState } from "../states/calculator"
import { BigMoneyInput } from "./BigMoneyInput"
import { BigMoneyPeopleNumInput } from "./BigMoneyPeopleNumInput"
import { SmallMoneyInput } from "./SmallMoneyInput"
import { SmallMoneyPeopleNumInput } from "./SmallMoneyPeopleNumInput"
import { TotalMoneyInput } from "./TotalMoneyInput"
import { TotalPeopleNumInput } from "./TotalPeopleNumInput"

export const Calculator = () => {
  const result = useRecoilValue(resultState);
  const peopleNum = useRecoilValue(peopleNumState);
  return (
    <>
      <h2>総額</h2>
      <TotalMoneyInput />
      <h2>人数</h2>
      <TotalPeopleNumInput />
      <h2>多めに払う人数</h2>
      <BigMoneyPeopleNumInput />
      <h2>多めに払う人の金額</h2>
      <BigMoneyInput />
      <h2>少なめに払う人数</h2>
      <SmallMoneyPeopleNumInput />
      <h2>少なめに払う人の金額</h2>
      <SmallMoneyInput />
      <h2>結果</h2>
      <ul>
        <li>請求　: {result.total}</li>
        <li>普通　: {result.normal}</li>
        {peopleNum.big !== 0 && <li>多め　: {result.big}</li>}
        {peopleNum.small !== 0 && <li>少なめ: {result.small}</li>}
        <li>余り　: {result.remaining}</li>
      </ul>
    </>
  )
}
