import { configureStore } from "@reduxjs/toolkit";
import { save, load } from "redux-localstorage-simple";
import trainReducer from "./trainSlice";

export const store = configureStore({
  reducer: {
    trainReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save()),
  preloadedState: load(),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
