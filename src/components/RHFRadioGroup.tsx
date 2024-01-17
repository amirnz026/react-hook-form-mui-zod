import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import { Option } from "../types/option";

interface Props<T extends FieldValues> {
  options?: Option[];
  name: Path<T>;
  label: string;
}

export function RHFRadioGroup<T extends FieldValues>({
  options,
  name,
  label,
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl {...field} error={!!error}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup>
            {options?.map((gender) => (
              <FormControlLabel
                value={gender.id}
                control={<Radio checked={field.value === gender.id} />}
                label={gender.label}
                key={gender.id}
              />
            ))}
          </RadioGroup>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
