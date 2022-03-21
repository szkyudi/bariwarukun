import { useRecoilState } from "recoil";
import { smallMoneyState } from "../states/calculator";
import { NumericInput } from "./NumericInput";

export const SmallMoneyInput = ({ ...props }) => {
  const [num, setNum] = useRecoilState(smallMoneyState)
  return (
    <NumericInput
      value={num}
      onChange={setNum}
      label="金額"
      adorment="円"
      {...props}
    />
  )
}
