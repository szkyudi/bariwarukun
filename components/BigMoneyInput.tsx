import { useRecoilState } from "recoil";
import { bigMoneyState } from "../states/calculator";
import { NumericInput } from "./NumericInput";

export const BigMoneyInput = ({ ...props }) => {
  const [num, setNum] = useRecoilState(bigMoneyState)
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
