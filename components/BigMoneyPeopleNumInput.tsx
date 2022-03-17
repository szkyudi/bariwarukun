import { useRecoilState } from "recoil";
import { bigMoneyPeopleNumState } from "../states/calculator";

export const BigMoneyPeopleNumInput = () => {
  const [num, setNum] = useRecoilState(bigMoneyPeopleNumState)
  return (
    <input
      type="number"
      value={String(num)}
      onChange={(e) => setNum(Number(e.currentTarget.value))}
    />
  )
}
