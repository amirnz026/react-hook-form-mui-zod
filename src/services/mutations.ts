import axios from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Schema } from "../types/schema";
import { mapData } from "../utils/mapData";

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Schema) => {
      await axios.post("http://localhost:8080/users", mapData(data));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useEditUser() {
  return useMutation({
    mutationFn: async (data: Schema) => {
      await axios.put("http://localhost:8080/users", mapData(data));
    },
  });
}
