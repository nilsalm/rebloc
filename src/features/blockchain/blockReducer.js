import { computeNextBlock, createGenesisBlock } from "./Blockchain";

const initialState = createGenesisBlock();

const blockReducer = (state = [initialState], action) => {
  switch (action.type) {
    case "ADD_BLOCK":
      // This answer helped! https://stackoverflow.com/a/40925668/15773509
      const newBlock = computeNextBlock(state, action.payload);
      return [...state, newBlock];
    default:
      return state;
  }
};

export default blockReducer;
