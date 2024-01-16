import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";

import { defaultValues, Schema, schema } from "./types/schema";

interface Props {
  children: ReactNode;
}

export default function Provider({ children }: Props) {
  const methods = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
    // shouldUnregister: true,
  });

  return (
    <FormProvider {...methods}>
      {children}

      <DevTool control={methods.control} />
    </FormProvider>
  );
}
