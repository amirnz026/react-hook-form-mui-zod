import { useFormContext } from "react-hook-form";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { Options } from "../types/options";
import { Schema } from "../types/schema";

interface Props {
  options: Options;
}

export default function RHFToggleButtonGroup({ options }: Props) {
  const { register } = useFormContext<Schema>();

  return (
    <ToggleButtonGroup {...register("languagesSpoken")}>
      {options.map((option) => (
        <ToggleButton value={option.id} key={option.id}>
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
