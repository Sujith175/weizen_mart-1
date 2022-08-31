export const initialState = null;
export const reducer = (state, action) => {
  if (Selection.type === "USER") {
    return action.pyload;
  }
  return state;
};
