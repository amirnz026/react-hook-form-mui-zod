import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { defaultValues, schema, Schema } from "./types/schema";

export default function App() {
  const { register } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return <>hi</>;
}
