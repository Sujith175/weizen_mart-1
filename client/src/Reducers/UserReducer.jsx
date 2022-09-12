export const initialState = null;
export const reducer = (state, action) => {
  if (Selection.type === "USER") {
    return action.pyload;
  }
  if (action.type == "CLEAR") {
    return null;
  }
  return state;
};
