import { FormControl, FormControlProps, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { ChangeEvent } from "react";
import { v4 as uuidv4 } from 'uuid';

interface Props extends FormControlProps {
  value: number,
  setter?: Dispatch<SetStateAction<number>>,
  label: string,
  adorment: string,
  disabled?: boolean
}
export const NumericInput = ({ value, setter, label, adorment, disabled, ...props }: Props) => {
  const id = uuidv4()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = Number(e.currentTarget.value);
    if (setter && Number.isInteger(currentValue)) {
      setter(currentValue);
    }
  }

  return (
    <FormControl variant="outlined" {...props} disabled={disabled}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        value={value === 0 ? '' : value}
        onChange={handleChange}
        endAdornment={<InputAdornment position="end">{adorment}</InputAdornment>}
        label={label}
        onFocus={(e) => e.currentTarget.select()}
      />
    </FormControl>
  )
}
