import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { Options } from "../types/options";

interface Props<T extends FieldValues> {
  options: Options;
  name: Path<T>;
}

export default function RHFToggleButtonGroup<T extends FieldValues>({
  options,
  name,
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...field } }) => (
        <ToggleButtonGroup
          onChange={(_, newValue) => {
            if (newValue.length) {
              onChange(newValue);
            }
          }}
          value={value.length ? value : [options[0].id]}
          {...field}
        >
          {options.map((option) => (
            <ToggleButton value={option.id} key={option.id}>
              {option.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    />
  );
}
