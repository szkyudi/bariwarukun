import { useRecoilState } from "recoil";
import { smallMoneyPeopleNumState } from "../states/calculator";

export const SmallMoneyPeopleNumInput = () => {
  const [num, setNum] = useRecoilState(smallMoneyPeopleNumState)
  return (
    <input
      type="number"
      value={String(num)}
      onChange={(e) => setNum(Number(e.currentTarget.value))}
    />
  )
}
