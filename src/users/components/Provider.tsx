import { FormProvider, useForm } from "react-hook-form";

import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";

import { defaultValues, Schema, schema } from "../types/schema";
import Page from "./Page";

export function Provider() {
  const methods = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
    shouldUnregister: true,
  });

  return (
    <FormProvider {...methods}>
      <Page />
      <DevTool control={methods.control} />
    </FormProvider>
  );
}
