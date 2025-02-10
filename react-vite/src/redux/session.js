const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const UPDATE_USER_SUBSCRIPTION = 'session/updateUserSubscription';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

const updateUserSubscription = (user) => ({
  type: UPDATE_USER_SUBSCRIPTION,
  payload: user
})





export const thunkAuthenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/");
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const thunkLogin = (credentials) => async dispatch => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkLogout = () => async (dispatch) => {
  await fetch("/api/auth/logout");
  dispatch(removeUser());
};

export const changePassword = (user) => async (dispatch) => {

  const response = await fetch('/api/auth/password', {
    method: "PUT",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(user)
  })
  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};




export const updateUserSubscriptionById = (user) => async (dispatch) => {
  const userId = user.userId;
  const subscriptionId = user.subscriptionId
 const response = await fetch(`/api/users/update/${userId}/${subscriptionId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  if(response.ok) {
    const data = await response.json();
    dispatch(updateUserSubscription(data));
    return data;

  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }

}

export const convertToFreeAccount = (user) => async (dispatch) => {
  const userId = user.id;
  const subscriptionId = user.subscriptionId
  const response = await fetch(`/api/users/cancel/${userId}/${subscriptionId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  })
  if(response.ok) {
    const data = await response.json();
    dispatch(updateUserSubscription(data));
    return data;

  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
}

export const deleteUserAccount = (user) => async (dispatch) => {
  const response = await fetch('/api/users/delete', {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(user)
  });
  if(response.ok) {
    const data = await response.json();
    dispatch(removeUser())
    return data;

  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
}

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      const newState = {...state, user: action.payload}
      return newState;
    }
    case REMOVE_USER: {
      const newState = {...state, user: null};
      return newState;
    }
    case UPDATE_USER_SUBSCRIPTION: {
      const newState = {...state, user: action.payload}
      return newState;
    }

    default:
      return state;
  }
}

export default sessionReducer;
