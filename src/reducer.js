export const initialState = {
  token: null,
  username: null,
  score: 0,
};

export default function reducer(state, action) {
  console.log(action);
  console.log(state.score);

  switch (action.type) {
    case "TOKEN":
      return {
        ...state,
        token: action.token,
      };

    case "USERNAME":
      return {
        ...state,
        username: action.username,
      };

    case "SCORE":
      return {
        ...state,
        score: action.score,
      };

    default:
      return {
        ...state,
      };
  }
}
