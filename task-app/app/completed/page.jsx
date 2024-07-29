"use client";

import Tasks from "@/src/components/Sidebar/Tasks";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllTasks } from "@/src/features/task/taskSlice";

const Completed = () => {
  const { loading, tasks } = useSelector((store) => store.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  const completedTasks = tasks.filter((task) => task.isCompleted === true);

  if (loading) {
    return (
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="loader"></div> {/* Add your loader animation here */}
      </main>
    );
  }
  return <Tasks tasks={completedTasks} title={"Completed Tasks"} />;
};

export default Completed;
