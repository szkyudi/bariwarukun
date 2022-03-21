import { useRecoilState } from "recoil";
import { bigMoneyPeopleNumState } from "../states/calculator";
import { NumericInput } from "./NumericInput";

export const BigMoneyPeopleNumInput = ({ ...props }) => {
  const [num, setNum] = useRecoilState(bigMoneyPeopleNumState)
  return (
    <NumericInput
      value={num}
      onChange={setNum}
      label="人数"
      adorment="人"
      {...props}
    />
  )
}
