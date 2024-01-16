import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";

import { Option } from "../users/types/option";

interface Props<T extends FieldValues> {
  name: Path<T>;
  options?: Option[];
  label: string;
}
export function RHFAutocomplete<T extends FieldValues>({
  name,
  options,
  label,
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          value={value.map((val: Pick<Option, "id">["id"]) =>
            options?.find((item) => item.id === val)
          )}
          getOptionLabel={(option) =>
            options?.find((item) => item.id === option.id)?.label ?? ""
          }
          onChange={(_, newValue) => {
            onChange(newValue.map((item) => item.id));
          }}
          isOptionEqualToValue={(option, newValue) => option.id === newValue.id}
          disableCloseOnSelect
          options={options ?? []}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              inputRef={ref}
              error={!!error}
              helperText={error?.message}
              label={label}
            />
          )}
          renderOption={(props, option, { selected }) => (
            <Box component="li" {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon />}
                checkedIcon={<CheckBoxIcon />}
                checked={selected}
              />
              {option.label}
            </Box>
          )}
          multiple
        />
      )}
    />
  );
}
