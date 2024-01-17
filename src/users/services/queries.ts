import axios from "axios";

import { useQuery } from "@tanstack/react-query";

import { Option } from "../../types/option";
import { ApiGet } from "../types/apiTypes";
import { Schema } from "../types/schema";

export function useStates() {
  return useQuery({
    queryKey: ["states"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8080/states")
        .then((res) => res.data),
  });
}

export function useLanguages() {
  return useQuery({
    queryKey: ["languages"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8080/languages")
        .then((res) => res.data),
  });
}
export function useGenders() {
  return useQuery({
    queryKey: ["genders"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8080/genders")
        .then((res) => res.data),
  });
}
export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8080/skills")
        .then((res) => res.data),
  });
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: (): Promise<Option[]> =>
      axios.get<ApiGet[]>("http://localhost:8080/users").then((response) =>
        response.data.map((user) => ({
          id: user.id.toString(),
          label: user.name,
        }))
      ),
  });
}
export function useUser(id: string) {
  return useQuery({
    queryKey: ["user", { id }],
    queryFn: async (): Promise<Schema> => {
      const res = await axios
        .get<ApiGet>(`http://localhost:8080/users/${id}`)
        .then((response) => response.data);

      return {
        variant: "edit",
        id: res.id.toString(),
        name: res.name,
        email: res.email,
        formerEmploymentPeriod: [
          new Date(res.formerEmploymentPeriod[0]),
          new Date(res.formerEmploymentPeriod[1]),
        ],
        gender: res.gender,
        languagesSpoken: res.languagesSpoken,
        registrationDateAndTime: new Date(res.registrationDateAndTime),
        salaryRange: [res.salaryRange[0], res.salaryRange[1]],
        skills: res.skills,
        states: res.states,
        students: res.students,
        isTeacher: res.isTeacher,
      };
    },
    enabled: !!id,
  });
}
