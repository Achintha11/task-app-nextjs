import {
  createAsyncThunk,
  createSlice,
  configureStore,
} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

// Async Thunk to get all tasks
export const getAllTasks = createAsyncThunk("tasks/getAllTasks", async () => {
  try {
    const response = await axios.get("/api/tasks");
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch tasks"); // Add this line
    throw error;
  }
});

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { dispatch }) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      dispatch(getAllTasks());
      toast.success("Task deleted successfully"); // Add this line
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete task"); // Add this line
      throw error;
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, isCompleted }, { dispatch }) => {
    try {
      await axios.put("/api/tasks", { isCompleted, id });
      dispatch(getAllTasks());
      toast.success("Task updated successfully"); // Add this line
    } catch (error) {
      console.log(error);
      toast.error("Failed to update task"); // Add this line
    }
  }
);

export const addTask = createAsyncThunk(
  "task/addtask",
  async ({ task }, { dispatch }) => {
    try {
      const response = await axios.post("/api/tasks", task);
      dispatch(getAllTasks());
      toast.success("Task added successfully"); // Add this line
    } catch (error) {
      console.log(error);
      toast.error("Failed to add task"); // Add this line
    }
  }
);

// Task slice
const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error("Failed to fetch tasks"); // Add this line
      });
  },
});

export default taskSlice.reducer;
