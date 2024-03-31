import React from "react";
import { FastingActionTypes } from "@/constants";
import { FastingAction, FastingHistory, UserType } from "@/types";

export const createStorage = (user: UserType) => {
  localStorage.setItem(
    "fastingSession",
    JSON.stringify({
      user,
    })
  );
};

export const removeStorage = () => {
  localStorage.removeItem("fastingSession");
};

export const getStorage = () => {
  const fastingStorage = localStorage.getItem("fastingSession");

  if (!fastingStorage) return null;

  return JSON.parse(fastingStorage);
};

export const setStorage = (fastingData: FastingHistory) => {
  const fastingSession = getStorage();

  if (!fastingSession) return null;

  const fastingHistory = fastingSession.fastingHistories;

  localStorage.setItem(
    "fastingSession",
    JSON.stringify({
      ...fastingSession,
      fastingHistories: fastingHistory
        ? [...fastingHistory, fastingData]
        : [fastingData],
    })
  );
};

export const saveFasting = (
  dispatchFastingAction: React.Dispatch<FastingAction>,
  fastingData: FastingHistory
) => {
  setStorage(fastingData);

  dispatchFastingAction({
    type: FastingActionTypes.SET_FASTING_DATA,
    payload: { fastingData },
  });
};

export const deleteFasting = (
  dispatchFastingAction: React.Dispatch<FastingAction>,
  createdDate: string
) => {
  dispatchFastingAction({
    type: FastingActionTypes.DELETE_FASTING_DATA,
    payload: createdDate,
  });

  const fastingSession = getStorage();

  const fastingHistory: FastingHistory[] = fastingSession.fastingHistories;

  const filteredSessions = fastingHistory.filter(({ createdAt }) => {
    if (createdDate !== createdAt) return true;

    return false;
  });

  localStorage.setItem(
    "fastingSession",
    JSON.stringify({
      ...fastingSession,
      fastingHistories: filteredSessions,
    })
  );
};
