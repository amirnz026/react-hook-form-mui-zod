import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { Container, TextField } from "@mui/material";

import { RHFAutocomplete } from "./components/RHFAutocomplete";
import RHFRadioGroup from "./components/RHFRadioGroup";
import RHFToggleButtonGroup from "./components/RHFToggleButtonGroup";
import { Schema } from "./types/schema";
import { GENDERS, LANGUAGES, STATES } from "./utils/mockData";

export default function App() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<Schema>();

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Container>
      <TextField
        {...register("emailAddress")}
        label="Email address"
        error={!!errors.emailAddress}
        helperText={errors.emailAddress?.message}
      />
      <RHFAutocomplete<Schema> name="states" options={STATES} />
      <RHFToggleButtonGroup<Schema>
        options={LANGUAGES}
        name="languagesSpoken"
      />
      <RHFRadioGroup<Schema> name="gender" options={GENDERS} label="Gender" />
    </Container>
  );
}
