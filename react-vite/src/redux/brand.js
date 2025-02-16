const LOAD_BRANDS = 'brands/loadBrands';
const LOAD_BRAND_BY_NAME = 'brands/loadBrandsByName';

const loadBrands = (brands) => ({
    type: LOAD_BRANDS,
    brands
});

const loadBrandsByName = (name) => ({
    type: LOAD_BRAND_BY_NAME,
    name
});


export const getAllBrands = () => async (dispatch) => {
    const response = await fetch('/api/brands')
    if(response.ok) {
        const data = await response.json();

        dispatch(loadBrands(data));
        return data;

    } else if(response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again"}
    }
}

export const getBrandByName = (name) => async (dispatch) => {
    const response = await fetch(`/api/brands/${name}`)
    if(response.ok) {
        const data = await response.json();

        dispatch(loadBrandsByName(data));
        return data;
    } else if(response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again"}
    }
}


const initialState = {};

function brandReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_BRANDS: {
            const newState = {...state, ...action.brands}
            return newState;
        }
        case LOAD_BRAND_BY_NAME: {
            const newState = {...state, ...action.name}
            return newState;
        }

        default: return state;
    }
}

export default brandReducer;
