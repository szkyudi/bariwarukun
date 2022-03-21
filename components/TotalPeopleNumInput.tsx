import { useRecoilState } from "recoil";
import { totalPeopleNumState } from "../states/calculator";
import { NumericInput } from "./NumericInput";

export const TotalPeopleNumInput = ({ ...props }) => {
  const [num, setNum] = useRecoilState(totalPeopleNumState)
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
