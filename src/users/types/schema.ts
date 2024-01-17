import { z } from "zod";

import { patterns } from "../../constants";

export const schema = z.intersection(
  z.intersection(
    z.object({
      name: z.string().min(1),
      email: z
        .string()
        .min(1, { message: "Email is required" })
        .refine((email) => patterns.email.test(email), {
          message: "Email not valid",
        }),

      states: z.array(z.string()).min(1).max(2),

      gender: z.string().min(1),

      languagesSpoken: z.array(z.string()),

      skills: z.array(z.string()).max(2),

      registrationDateAndTime: z.date(),

      formerEmploymentPeriod: z.array(z.date()).max(2),

      salaryRange: z.array(z.number()).max(2),
    }),
    z.discriminatedUnion("isTeacher", [
      z.object({
        isTeacher: z.literal(false),
      }),
      z.object({
        isTeacher: z.literal(true),
        students: z.array(
          z.object({
            name: z.string().min(4),
          })
        ),
      }),
    ])
  ),
  z.discriminatedUnion("variant", [
    z.object({ variant: z.literal("create") }),
    z.object({ variant: z.literal("edit"), id: z.string().min(1) }),
  ])
);

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  variant: "create",
  name: "",
  formerEmploymentPeriod: [new Date(), new Date()],
  email: "",
  gender: "",
  isTeacher: false,
  states: [],
  languagesSpoken: [],
  registrationDateAndTime: new Date(),
  salaryRange: [0, 2000],
  skills: [],
};
