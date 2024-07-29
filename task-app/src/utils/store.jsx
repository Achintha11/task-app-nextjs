import themeReducer from "../features/themes/themeSlice";
import taskReducer from "../features/task/taskSlice";
import modalReducer from "../features/modal/modalSlice";
import navBarReducer from "../features/navbar/navBarSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    theme: themeReducer,
    tasks: taskReducer,
    modal: modalReducer,
    navbar: navBarReducer,
  },
});

export default store;
