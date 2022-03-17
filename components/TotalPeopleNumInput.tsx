import { useRecoilState } from "recoil";
import { totalPeopleNumState } from "../states/calculator";

export const TotalPeopleNumInput = () => {
  const [num, setNum] = useRecoilState(totalPeopleNumState)
  return (
    <input
      type="number"
      value={String(num)}
      onChange={(e) => setNum(Number(e.currentTarget.value))}
    />
  )
}
