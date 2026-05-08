import { createContext, useEffect, useReducer } from "react";
import { taskReducer, initialTaskState } from "./taskReducer";

export const TaskContext = createContext();

const STORAGE_KEY = "mini-app-tasks";

const initState = () => {
  const savedTasks = localStorage.getItem(STORAGE_KEY);
  if (savedTasks) {
    return { tasks: JSON.parse(savedTasks) };
  }
  return initialTaskState;
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initState());
  
  // Lưu vào localStorage khi tasks thay đổi
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
  }, [state.tasks]);
  
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

