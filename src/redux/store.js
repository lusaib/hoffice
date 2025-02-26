import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import { localStorageMiddleware } from "./MiddleWare";

const thunkArguments = {};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: thunkArguments,
      },
    }).concat(localStorageMiddleware),
});

thunkArguments.store = store;

export default store;
