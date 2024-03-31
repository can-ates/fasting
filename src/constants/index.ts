import { FastingState } from "@/types";

export const initialFastingState: FastingState = {
  user: {
    id: "",
    name: "",
    email: "",
  },
  fastingHistories: [],
};

export const FastingActionTypes = {
  SET_FASTING_DATA: "SET_FASTING_DATA",
  SET_STATE: "SET_STATE",
  DELETE_FASTING_DATA: "DELETE_FASTING_DATA",
};
