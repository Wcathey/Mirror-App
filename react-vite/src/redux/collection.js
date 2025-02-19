const LOAD_COLLECTIONS ='collections/loadCollections';
const LOAD_COLLECTION_BY_NAME = 'collections/loadCollectionsByName';

const loadCollections = (collections) => ({
    type: LOAD_COLLECTIONS,
    collections
});

const loadCollectionByName = (name) => ({
    type: LOAD_COLLECTION_BY_NAME,
    name
});


export const getAllCollections = () => async (dispatch) => {
    const response = await fetch('/api/collections')
    if(response.ok) {
        const data = await response.json();

        dispatch(loadCollections(data));
        return data;

    } else if(response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again"}
    }
}

export const getCollectionByName = (name) => async (dispatch) => {
    const response = await fetch(`/api/collections/${name}`)
    if(response.ok) {
        const data = await response.json();

        dispatch(loadCollectionByName(data));
        return data;
    } else if(response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again"}
    }
}


const initialState = {};

function collectionReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_COLLECTIONS: {
            const newState = {...state, ...action.collections}
            return newState;
        }
        case LOAD_COLLECTION_BY_NAME: {
            const newState = {...state, ...action.name}
            return newState;
        }

        default: return state;
    }
}

export default collectionReducer;
