import { FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { ChangeEvent } from "react";
import { SetterOrUpdater } from "recoil";

type Props = {
  value: number,
  onChange?: SetterOrUpdater<number>,
  label: string,
  adorment: string,
  disabled?: boolean
}
export const NumericInput = ({ value, onChange, label, adorment, disabled, ...props }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    const value = Number(e.currentTarget.value);
    if (Number.isInteger(value)) {
      onChange(value);
    }
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
        size="small"
        onFocus={(e) => e.currentTarget.select()}
      />
    </FormControl>
  )
}
