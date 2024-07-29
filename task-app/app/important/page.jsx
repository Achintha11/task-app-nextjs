"use client";

import Tasks from "@/src/components/Sidebar/Tasks";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllTasks } from "@/src/features/task/taskSlice";

const Important = () => {
  const { loading, tasks } = useSelector((store) => store.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  const importantTasks = tasks.filter((task) => task.isImportant === true);

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
  return <Tasks tasks={importantTasks} title={"Important Tasks"} />;
};

export default Important;
