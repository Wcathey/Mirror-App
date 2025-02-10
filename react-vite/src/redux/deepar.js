import * as deepar from "deepar";

const START_DEEPAR = 'deepar/startDeepar';



const startDeepar = (data) => ({
    type: START_DEEPAR,
    data

});



export const initializeDeepAr = (element) => async (dispatch) => {
    const deepAR = await deepar.initialize({
        licenseKey: "16246bf4acafadf74cb16bf63a8f3ce7c71e4602bbc200f4ebf5863c12f603ebc9e260c61927603b",
        previewElement: element

    });
        dispatch(startDeepar(deepAR));


}

export const reloadDeepAr = (deepAR) => async () => {
    await deepAR.shutdown();


}

const initialState = {};

function deeparReducer(state = initialState, action) {
    switch (action.type) {
        case START_DEEPAR: {
            const newState = {... state, Sdk: action.data};
            return newState;
        }


        default: return state;
    }
}

export default deeparReducer;
