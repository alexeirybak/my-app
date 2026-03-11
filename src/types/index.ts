export interface IUser {
  id: number;
  name: string;
  email: string;
  age: number;
  level: number;
  experience: number;
  tasksCompleted: number;
}

export interface ITask {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface UserActionsProps {
  onLevelUp: () => void;
  onAddExperience: (amount: number) => void;
  onReset: () => void;
}
