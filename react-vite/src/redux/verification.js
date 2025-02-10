const SET_VERIFICATION = 'verification/setVerification';
const REMOVE_VERIFICATION = 'verification/removeVerification';


const setVerification = (verification) => ({
    type: SET_VERIFICATION,
    payload: verification
});

const removeVerification = () => ({
    type: REMOVE_VERIFICATION
});

export const verifyPassword = (user) => async (dispatch) => {
  const response = await fetch('/api/verification_2FA/password', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(user)
  });
  if(response.ok) {
    const data = await response.json();
    dispatch(setVerification(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
}

export const clearVerificationStatus = () => async (dispatch) => {
    await fetch("api/verification_2FA/clear");
    dispatch(removeVerification());
}

const initialState = {verification: null};

function verificationReducer(state = initialState, action) {
    switch(action.type) {
        case SET_VERIFICATION: {
            const newState = {...state, verification: action.payload}
            return newState;
        }
        case REMOVE_VERIFICATION: {
            const newState = {...state, verification: null};
            return newState;
        }

        default:
            return state;
    }
}

export default verificationReducer;
