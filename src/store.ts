import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import insidersReducer from "./Insiders/insidersSlice";
import editorReducer from "./editor/editorSlice";

export const store = configureStore({
  reducer: {
    insiders: insidersReducer,
    editor: editorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
