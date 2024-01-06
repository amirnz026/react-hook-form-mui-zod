import { z } from "zod";

import { patterns } from "../constants";

export const schema = z.intersection(
  z.object({
    emailAddress: z
      .string()
      .min(1, { message: "Email is required" })
      .refine((email) => patterns.email.test(email), {
        message: "Email not valid",
      }), // textField

    states: z.array(z.string()), // autoComplete

    gender: z.string(), // radioGroup

    languagesSpoken: z.array(z.string()), // toggleButton

    skills: z.array(z.object({ id: z.string(), label: z.string() })), // checkbox,

    registrationDateAndTime: z.date(), // dateTimePicker

    salaryRange: z.array(z.number()), // slider
  }),
  z.discriminatedUnion("isTeacher", [
    z.object({
      isTeacher: z.literal(false),
    }),
    z.object({
      isTeacher: z.literal(true),
      students: z.array(
        z.object({
          name: z.string(),
        })
      ),
    }),
  ])
); // stepper

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  emailAddress: "",
  gender: "",
  isTeacher: false,
  states: [],
  languagesSpoken: [],
  registrationDateAndTime: new Date(),
  salaryRange: [0, 2000],
  skills: [],
};
