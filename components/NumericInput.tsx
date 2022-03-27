import { FormControl, FormControlProps, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { ChangeEvent } from "react";

interface Props extends FormControlProps {
  value: number | '',
  setter?: Dispatch<SetStateAction<number>>,
  label: string,
  adorment: string,
  disabled?: boolean
}
export const NumericInput = ({ value, setter, label, adorment, disabled, ...props }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!setter) return;
    setter(Number(e.currentTarget.value));
  }

  return (
    <FormControl variant="outlined" {...props} disabled={disabled}>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        value={value}
        onChange={handleChange}
        endAdornment={<InputAdornment position="end">{adorment}</InputAdornment>}
        label={label}
        onFocus={(e) => e.currentTarget.select()}
      />
    </FormControl>
  )
}
