const LOAD_EYESHADOWS ='eyeshadows/loadEyeshadows';
const LOAD_EYESHADOWS_BY_NAME = 'eyeshadows/loadEyeshadowsByName';

const loadEyeshadows = (eyeshadows) => ({
    type: LOAD_EYESHADOWS,
    eyeshadows
});

const loadEyeshadowsByName = (name) => ({
    type: LOAD_EYESHADOWS_BY_NAME,
    name
});


export const getAllEyeshadows = () => async (dispatch) => {
    const response = await fetch('/api/eyeshadows')
    if(response.ok) {
        const data = await response.json();

        dispatch(loadEyeshadows(data));
        return data;

    } else if(response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again"}
    }
}

export const getEyeshadowByName = (name) => async (dispatch) => {
    const response = await fetch(`/api/eyeshadows/${name}`)
    if(response.ok) {
        const data = await response.json();

        dispatch(loadEyeshadowsByName(data));
        return data;
    } else if(response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again"}
    }
}


const initialState = {};

function eyeshadowReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_EYESHADOWS: {
            const newState = {...state, ...action.eyeshadows}
            return newState;
        }
        case LOAD_EYESHADOWS_BY_NAME: {
            const newState = {...state, ...action.name}
            return newState;
        }

        default: return state;
    }
}

export default eyeshadowReducer;
