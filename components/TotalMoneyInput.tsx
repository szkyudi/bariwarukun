import { useRecoilState } from "recoil";
import { totalMoneyState } from "../states/calculator";
import { NumericInput } from "./NumericInput";

export const TotalMoneyInput = ({ ...props }) => {
  const [num, setNum] = useRecoilState(totalMoneyState)
  return (
    <NumericInput
      value={num}
      onChange={setNum}
      label="お会計"
      adorment="円"
      {...props}
    />
  )
}
