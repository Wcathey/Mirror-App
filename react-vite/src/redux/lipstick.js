const LOAD_LIPSTICKS ='lipsticks/loadLipsticks';
const LOAD_LIPSTICKS_BY_NAME = 'lipsticks/loadLipsticksByName';

const loadLipsticks = (lipsticks) => ({
    type: LOAD_LIPSTICKS,
    lipsticks
});

const loadLipsticksByName = (name) => ({
    type: LOAD_LIPSTICKS_BY_NAME,
    name
});


export const getAllLipsticks = () => async (dispatch) => {
    const response = await fetch('/api/lipsticks')
    if(response.ok) {
        const data = await response.json();

        dispatch(loadLipsticks(data));
        return data;

    } else if(response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again"}
    }
}

export const getLipstickByName = (name) => async (dispatch) => {
    const response = await fetch(`/api/lipsticks/${name}`)
    if(response.ok) {
        const data = await response.json();

        dispatch(loadLipsticksByName(data));
        return data;
    } else if(response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again"}
    }
}


const initialState = {};

function lipstickReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_LIPSTICKS: {
            const newState = {...state, ...action.lipsticks}
            return newState;
        }
        case LOAD_LIPSTICKS_BY_NAME: {
            const newState = {...state, ...action.name}
            return newState;
        }

        default: return state;
    }
}

export default lipstickReducer;
