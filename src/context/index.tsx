"use client";
import { getStorage } from "@/actions";
import { FastingActionTypes, initialFastingState } from "@/constants";
import {
  FastingAction,
  FastingContextValue,
  FastingProviderProps,
  FastingState,
} from "@/types";
import React, { createContext, useReducer, useContext, useEffect } from "react";

const FastingContext = createContext<FastingContextValue | null>(null);

const reducer = (
  state: FastingState,
  { type, payload }: FastingAction
): FastingState => {
  switch (type) {
    case FastingActionTypes.SET_FASTING_DATA:
      return {
        ...state,
        fastingHistories: [...state.fastingHistories, payload.fastingData],
      };
    case FastingActionTypes.SET_STATE:
      return {
        ...state,
        ...payload,
      };
    case FastingActionTypes.DELETE_FASTING_DATA:
      const filteredSessions = state.fastingHistories.filter(
        ({ createdAt }) => {
          if (payload !== createdAt) return true;

          return false;
        }
      );
      return {
        ...state,
        fastingHistories: filteredSessions,
      };
    default:
      return state;
  }
};

export const FastingProvider: React.FC<FastingProviderProps> = ({
  children,
}) => {
  const [FastingState, dispatchFastingAction] = useReducer(
    reducer,
    initialFastingState
  );

  useEffect(() => {
    const fastingSession = getStorage();

    if (fastingSession) {
      dispatchFastingAction({
        type: FastingActionTypes.SET_STATE,
        payload: fastingSession,
      });
    }
  }, []);

  return (
    <FastingContext.Provider value={{ FastingState, dispatchFastingAction }}>
      {children}
    </FastingContext.Provider>
  );
};

export const useFastingContext = () => {
  const context = useContext(FastingContext);
  if (context === null) {
    throw new Error("useFastingContext must be used within a FastingProvider");
  }
  return context;
};
