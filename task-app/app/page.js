"use client";

import Tasks from "@/src/components/Sidebar/Tasks";
import { useSelector } from "react-redux";

export default function Home() {
  return <Tasks title={"All Tasks"} />;
}
