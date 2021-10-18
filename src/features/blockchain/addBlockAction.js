const addBlockAction = (data = {}) => {
  return {
    type: "ADD_BLOCK",
    payload: data,
  };
};

export default addBlockAction;
