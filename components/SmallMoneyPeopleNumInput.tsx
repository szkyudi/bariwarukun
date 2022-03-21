import { useRecoilState } from "recoil";
import { smallMoneyPeopleNumState } from "../states/calculator";
import { NumericInput } from "./NumericInput";

export const SmallMoneyPeopleNumInput = ({ ...props }) => {
  const [num, setNum] = useRecoilState(smallMoneyPeopleNumState)
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
