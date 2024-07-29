"use client";

import Tasks from "@/src/components/Sidebar/Tasks";
import { getAllTasks } from "@/src/features/task/taskSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { loading, tasks } = useSelector((store) => store.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  // if (loading) {
  //   return (
  //     <main
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "100vh",
  //       }}
  //     >
  //       <div className="loader"></div> {/* Add your loader animation here */}
  //     </main>
  //   );
  // }
  return <Tasks tasks={tasks} title={"All Tasks"} />;
}
