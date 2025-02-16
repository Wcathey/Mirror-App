const LOAD_FOUNDATIONS = 'foundations/loadFoundations';
const LOAD_FOUNDATION_BY_NAME = 'foundations/loadFoundationByName';


const loadFoundations = (foundations) => ({
    type: LOAD_FOUNDATIONS,
    foundations
});

const loadFoundationByName = (name) => ({
    type: LOAD_FOUNDATION_BY_NAME,
    name
});


export const getAllFoundations = () => async (dispatch) => {
    const response = await fetch('/api/foundations')
    if(response.ok) {
        const data = await response.json();

        dispatch(loadFoundations(data));
        return data;

    } else if(response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again"}
    }
}

export const getFoundationByName = (name) => async (dispatch) => {
    const response = await fetch(`/api/foundations/${name}`);
    if(response.ok) {
        const data = await response.json();

        dispatch(loadFoundationByName(data));
        return data;
    } else if(response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again"}
    }
}



const initialState = {};

function foundationReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_FOUNDATIONS: {
            const newState = {...state, ...action.foundations};
            return newState;
        }
        case LOAD_FOUNDATION_BY_NAME: {
            const newState = {...state, ...action.name};
            return newState;
        }

        default: return state;
    }
}

export default foundationReducer;
