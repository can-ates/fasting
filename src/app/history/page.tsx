"use client";
import React from "react";
import { useFastingContext } from "@/context";

import History from "../components/History";

const HistoryPage = () => {
  const { FastingState } = useFastingContext();

  const { fastingHistories } = FastingState;

  return (
    <div>
      <History histories={fastingHistories} />
    </div>
  );
};

export default HistoryPage;
