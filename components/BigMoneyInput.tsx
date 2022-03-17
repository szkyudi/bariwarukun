import { useRecoilState } from "recoil";
import { bigMoneyState } from "../states/calculator";

export const BigMoneyInput = () => {
  const [num, setNum] = useRecoilState(bigMoneyState)
  return (
    <input
      type="number"
      value={String(num)}
      onChange={(e) => setNum(Number(e.currentTarget.value))}
    />
  )
}
