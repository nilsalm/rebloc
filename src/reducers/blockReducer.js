import { addBlock } from "../component/blockchain";

const blockReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_BLOCK":
      return addBlock(state, action.data);
    default:
      return state;
  }
};

export default blockReducer;
