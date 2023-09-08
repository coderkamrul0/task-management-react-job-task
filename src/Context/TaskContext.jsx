/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);

    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
  };

  const updateTask = (taskId, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const changeTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const [teamTask, setTeamTask] = useState([]);

  useEffect(() => {
    const storedTeamTasks = JSON.parse(localStorage.getItem("teamTask")) || [];
    setTeamTask(storedTeamTasks);
  }, []);

  const addTeamTask = (newTeamTask) => {
    setTeamTask([...teamTask, newTeamTask]);

    localStorage.setItem(
      "teamTask",
      JSON.stringify([...teamTask, newTeamTask])
    );
  };

  const updateTeamTask = (taskId, updatedTask) => {
    const updatedTasks = teamTask.map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    setTeamTask(updatedTasks);
    localStorage.setItem("teamTask", JSON.stringify(updatedTasks));
  };

  const deleteTeamTask = (taskId) => {
    const updatedTasks = teamTask.filter((task) => task.id !== taskId);
    setTeamTask(updatedTasks);
    localStorage.setItem("teamTask", JSON.stringify(updatedTasks));
  };

  const changeTeamTaskStatus = (taskId, newStatus) => {
    const updatedTasks = teamTask.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTeamTask(updatedTasks);

    localStorage.setItem("teamTask", JSON.stringify(updatedTasks));
  };

  const contextValue = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    changeTaskStatus,
    teamTask,
    addTeamTask,
    updateTeamTask,
    deleteTeamTask,
    changeTeamTaskStatus,
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
}
