import { addBlock, createGenesisBlock } from "../component/blockchain";

const initialState = createGenesisBlock();

const blockReducer = (state = [initialState], action) => {
  switch (action.type) {
    case "ADD_BLOCK":
      return addBlock(state, action.payload);
    default:
      return state;
  }
};

export default blockReducer;
