const initialState = { isSignedIn: false };

function toggleSignIn(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'TOGGLE_SIGNIN':
      nextState = {
        ...state,
        isSignedIn: action.value,
      };
      return nextState;
    default:
      return state;
  }
}

export default toggleSignIn;
