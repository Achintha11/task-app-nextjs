import themeReducer from "../features/themes/themeSlice";
import taskReducer from "../features/task/taskSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    theme: themeReducer,
    tasks: taskReducer,
  },
});

export default store;
