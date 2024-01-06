import { useFormContext } from "react-hook-form";

import {
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { RHFAutocomplete } from "./components/RHFAutocomplete";
import { Schema } from "./types/schema";
import { STATES } from "./utils/mockData";

export default function App() {
  const {
    register,
    formState: { errors },
  } = useFormContext<Schema>();

  return (
    <Container>
      <TextField
        {...register("emailAddress")}
        label="Email address"
        error={!!errors.emailAddress}
        helperText={errors.emailAddress?.message}
      />

      <RHFAutocomplete<Schema> name="states" options={STATES} />

      <RadioGroup {...register("gender")}>
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
      </RadioGroup>
    </Container>
  );
}
