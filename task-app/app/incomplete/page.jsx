"use client";

import Tasks from "@/src/components/Sidebar/Tasks";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllTasks } from "@/src/features/task/taskSlice";

const Incomplete = () => {
  const { loading, tasks } = useSelector((store) => store.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);

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
  return <Tasks tasks={incompleteTasks} title={"Incompleted Tasks"} />;
};

export default Incomplete;
