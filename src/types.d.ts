export interface FastingState {}

export type FastingAction = {
  type: string;
  payload?: any;
};

export type FastingProviderProps = {
  children: React.ReactNode;
};

export interface FastingContextValue {
  FastingState: FastingState;
  dispatchFastingAction: Dispatch<FastingAction>;
}

export type ContainerProps = {
  children: React.ReactNode;
};

export type CardProps = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export type FormDataTypes = {
  name: string;
  email: string;
  password: string;
};
