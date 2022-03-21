import { useRecoilValue } from "recoil";
import { normalMoneyState } from "../states/calculator";
import { NumericInput } from "./NumericInput";

export const NormalMoneyInput = ({ ...props }) => {
  const num = useRecoilValue(normalMoneyState)
  return (
    <NumericInput
      value={num}
      label="金額"
      adorment="円"
      disabled
      {...props}
    />
  )
}
