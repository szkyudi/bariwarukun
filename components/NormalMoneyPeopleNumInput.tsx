import { useRecoilValue } from "recoil";
import { normalMoneyPeopleNumState } from "../states/calculator";
import { NumericInput } from "./NumericInput";

export const NormalMoneyPeopleNumInput = ({ ...props }) => {
  const num = useRecoilValue(normalMoneyPeopleNumState)
  return (
    <NumericInput
      value={num}
      label="人数"
      adorment="人"
      disabled
      {...props}
    />
  )
}
