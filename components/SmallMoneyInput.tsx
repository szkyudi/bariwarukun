import { useRecoilState } from "recoil";
import { smallMoneyState } from "../states/calculator";

export const SmallMoneyInput = () => {
  const [num, setNum] = useRecoilState(smallMoneyState)
  return (
    <input
      type="number"
      value={String(num)}
      onChange={(e) => setNum(Number(e.currentTarget.value))}
    />
  )
}
