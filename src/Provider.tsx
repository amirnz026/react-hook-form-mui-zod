import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

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
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
