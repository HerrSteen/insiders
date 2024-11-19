import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import insidersReducer from "./Insiders/insidersSlice";

export const store = configureStore({
  reducer: {
    insiders: insidersReducer,
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
