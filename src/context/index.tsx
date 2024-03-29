"use client";
import {
  FastingAction,
  FastingContextValue,
  FastingProviderProps,
  FastingState,
} from "@/types";
import React, { createContext, useReducer, useContext } from "react";

const FastingContext = createContext<FastingContextValue | null>(null);

const reducer = (state: FastingState, action: FastingAction): FastingState => {
  switch (action.type) {
    default:
      return state;
  }
};

export const FastingProvider: React.FC<FastingProviderProps> = ({
  children,
}) => {
  const [FastingState, dispatchFastingAction] = useReducer(reducer, {});

  return (
    <FastingContext.Provider value={{ FastingState, dispatchFastingAction }}>
      {children}
    </FastingContext.Provider>
  );
};

export const useFastingContext = () => useContext(FastingContext);
