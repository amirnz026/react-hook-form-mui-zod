import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import { Options } from "../types/options";

interface Props<T extends FieldValues> {
  options: Options;
  name: Path<T>;
  label: string;
}

export default function RHFRadioGroup<T extends FieldValues>({
  options,
  name,
  label,
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl {...field}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup>
            {options.map((gender) => (
              <FormControlLabel
                value={gender.id}
                control={<Radio />}
                label={gender.label}
                key={gender.id}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    />
  );
}