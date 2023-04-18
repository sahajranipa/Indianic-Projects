import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/posts";

const reducer = {
  post: postReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
