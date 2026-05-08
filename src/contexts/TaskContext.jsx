import { createContext, useEffect, useReducer, useContext } from "react";
import { taskReducer, initialTaskState } from "./taskReducer";

const TaskContext = createContext();

const STORAGE_KEY = "mini-app-tasks";

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  
  // Lấy dữ liệu từ localStorage 
  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      dispatch({ type: "LOAD", payload: JSON.parse(savedTasks) });
    }
  }, []);
  
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

export const useTaskContext = () => {
  return useContext(TaskContext);
};