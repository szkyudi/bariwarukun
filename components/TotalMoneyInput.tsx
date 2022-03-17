import { useRecoilState } from "recoil";
import { totalMoneyState } from "../states/calculator";

export const TotalMoneyInput = () => {
  const [num, setNum] = useRecoilState(totalMoneyState)
  return (
    <input
      type="number"
      value={String(num)}
      onChange={(e) => setNum(Number(e.currentTarget.value))}
    />
  )
}
