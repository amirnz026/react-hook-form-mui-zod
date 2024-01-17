import { Fragment, useEffect, useState } from "react";
import {
  FieldErrors,
  SubmitHandler,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";

import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  TextField,
} from "@mui/material";

import { RHFAutocomplete } from "../../components/RHFAutocomplete";
import RHFCheckbox from "../../components/RHFCheckbox";
import { RHFDateRangePicker } from "../../components/RHFDateRangePicker";
import { RHFDateTimePicker } from "../../components/RHFDateTimePicker";
import RHFRadioGroup from "../../components/RHFRadioGroup";
import { RHFSlider } from "../../components/RHFSlider";
import { RHFSwitch } from "../../components/RHFSwitch";
import RHFToggleButtonGroup from "../../components/RHFToggleButtonGroup";
import { useCreateUser, useEditUser } from "../services/mutations";
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
  useUser,
  useUsers,
} from "../services/queries";
import { defaultValues, Schema } from "../types/schema";

export default function Page() {
  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();
  const createUserMutation = useCreateUser();
  const editUserMutation = useEditUser();

  const [userId, setUserId] = useState("");
  const userQuery = useUser(userId);
  const usersQuery = useUsers();

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    reset,
    watch,
    // trigger
    // setValue
  } = useFormContext<Schema>();

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    reset(userQuery.data);
  }, [reset, userQuery.data]);

  const isTeacher = useWatch({ control, name: "isTeacher" });
  const variant = useWatch({ control, name: "variant" });
  const id = useWatch({ control, name: "id" });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "students",
  });

  useEffect(() => {
    if (!isTeacher) {
      replace([]);
    }
  }, [isTeacher, replace]);

  const handleReset = () => {
    reset(defaultValues);
  };

  const handleUserClick = (id: string) => {
    setUserId(id);
  };

  const onSubmit: SubmitHandler<Schema> = (data) => {
    if (variant === "create") {
      createUserMutation.mutate(data);
    } else {
      editUserMutation.mutate(data);
    }
  };

  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        <List subheader={<ListSubheader>Users</ListSubheader>}>
          {usersQuery.data?.map((user) => (
            <ListItem disablePadding key={user.id}>
              <ListItemButton
                onClick={() => handleUserClick(user.id)}
                selected={id === user.id}
              >
                <ListItemText primary={user.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Stack sx={{ gap: 2 }}>
          <TextField
            {...register("name")}
            label="Name"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            {...register("email")}
            label="Email address"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            InputLabelProps={{ shrink: true }}
          />
          <RHFAutocomplete<Schema>
            name="states"
            options={statesQuery.data}
            label="States"
          />
          <RHFToggleButtonGroup<Schema>
            options={languagesQuery.data}
            name="languagesSpoken"
          />
          <RHFRadioGroup<Schema>
            name="gender"
            options={gendersQuery.data}
            label="Gender"
          />

          <RHFCheckbox<Schema>
            name="skills"
            options={skillsQuery.data}
            label="Skills"
          />
          <RHFDateTimePicker<Schema>
            name="registrationDateAndTime"
            label="Registration Date & Time"
          />
          <RHFDateRangePicker<Schema> name="formerEmploymentPeriod" />
          <RHFSlider<Schema> name="salaryRange" label="Salary Range" />
          <RHFSwitch<Schema> name="isTeacher" label="Are you a teacher?" />
          {isTeacher && (
            <Button onClick={() => append({ name: "" })} type="button">
              Add new student
            </Button>
          )}
          {(() => {
            if (isTeacher) {
              const formErrors: FieldErrors<
                Extract<Schema, { isTeacher: typeof isTeacher }>
              > = errors;

              return (
                <>
                  {isTeacher && (
                    <>
                      {fields.map((field, index) => (
                        <Fragment key={field.id}>
                          <TextField
                            {...register(`students.${index}.name`)}
                            error={!!formErrors.students?.[index]?.name}
                            helperText={
                              formErrors.students?.[index]?.name?.message
                            }
                            fullWidth
                            label="Name"
                            InputLabelProps={{ shrink: true }}
                            key={field.id}
                          />
                          <Button
                            color="error"
                            onClick={() => remove(index)}
                            type="button"
                          >
                            Remove
                          </Button>
                        </Fragment>
                      ))}
                    </>
                  )}
                </>
              );
            }
          })()}
          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button variant="contained" type="submit">
              {variant === "create" ? "New User" : "Edit User"}
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
