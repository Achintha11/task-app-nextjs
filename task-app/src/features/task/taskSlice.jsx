import {
  createAsyncThunk,
  createSlice,
  configureStore,
} from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to get all tasks
export const getAllTasks = createAsyncThunk("tasks/getAllTasks", async () => {
  try {
    const response = await axios.get("/api/tasks");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error; // Ensure the error is thrown so it can be caught by the thunk's rejected action
  }
});

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { dispatch }) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      dispatch(getAllTasks());
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  }
);

export const addTask = createAsyncThunk(
  "task/addtask",
  async ({ task }, { dispatch }) => {
    try {
      const response = await axios.post("/api/tasks", task);
      dispatch(getAllTasks());
    } catch (error) {
      console.log(error);
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
      });
  },
});

export default taskSlice.reducer;
