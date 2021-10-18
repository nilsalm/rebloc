import blockReducer from "./blockReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  chain: blockReducer,
});

export default allReducers;
