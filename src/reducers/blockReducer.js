import { addBlock } from "../component/blockchain";

const initialState = {
  index: 0,
  timestamp: Math.floor(new Date().getTime() / 1000.0),
  data: "genesis",
  previousHash: 0,
  hash: 0,
};

const blockReducer = (state = [initialState], action) => {
  switch (action.type) {
    case "ADD_BLOCK":
      return addBlock(state, action.payload);
    default:
      return state;
  }
};

export default blockReducer;
