import { z } from "zod";

export const schema = z.object({
  name: z.string(),
  age: z.number(),
});

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  age: 0,
  name: "",
};
