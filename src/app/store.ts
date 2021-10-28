// import ReactDOM from "react-dom";
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import chainReducer from '../features/blockchain/blockSlice';

export const store = configureStore({
  reducer: {
    chain: chainReducer,
  },
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


