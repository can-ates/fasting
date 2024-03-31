export type FastingAction = {
  type: string;
  payload?: any;
};

export type FastingProviderProps = {
  children: React.ReactNode;
};

export type ContainerProps = {
  children: React.ReactNode;
};

export type TimerProps = {
  onCountDownChange: (time) => void;
  time: string;
  isActive: boolean;
};

type TextInputProps = {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  required?: boolean;
};

export type CardProps = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
};

export type FormDataTypes = {
  name: string;
  email: string;
  password: string;
};

export type FastingHistory = {
  duration: number;
  startTime: string;
  endTime: string;
  createdAt: string;
};

export interface FastingState {
  user: UserType;
  fastingHistories: fastingHistory[];
}

export interface FastingContextValue {
  FastingState: FastingState;
  dispatchFastingAction: Dispatch<FastingAction>;
}
