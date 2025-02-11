import * as deepar from "deepar";

const START_DEEPAR = 'deepar/startDeepar';



const startDeepar = (data) => ({
    type: START_DEEPAR,
    data

});



export const initializeDeepAr = (element) => async (dispatch) => {
    console.log("Deepar version: " + deepar.version);

    const deepAR = await deepar.initialize({
        licenseKey: "6daf2a9316acad2ec9d67358133c702c4aaccee2716170e43792704dddf7909fabdac8fe911dc529",
        previewElement: element,
        rootPath: '/deepar-resources'

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
