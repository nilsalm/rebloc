import counterReducer from "./counter";
import blockReducer from "./blockReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  counterReducer: counterReducer,
  chain: blockReducer,
});

export default allReducers;
