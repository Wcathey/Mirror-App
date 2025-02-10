const LOAD_SUBSCRIPTIONS = 'subscription/loadSubscriptions'
const LOAD_CURRENT_USER_SUBSCRIPTION = "subscription/loadCurrentUserSubscription"
const LOAD_SUBSCRIPTION_BY_TIER = "subscription/loadSubscriptionByTier";
const REMOVE_SUBSCRIPTION = 'subscription/removeSubscription';



const loadSubscriptions = (subscriptions) => ({
    type: LOAD_SUBSCRIPTIONS,
    subscriptions
})

const loadSubscriptionByTier = (tier
) => ({
    type: LOAD_SUBSCRIPTION_BY_TIER,
    tier
})

const loadCurrentUserSubscription = (subscription) => ({
    type: LOAD_CURRENT_USER_SUBSCRIPTION,
    subscription
})




export const getAllSubscriptions = () => async (dispatch) => {
    const response = await fetch("/api/subscriptions")
    if(response.ok) {
        const data = await response.json();

        dispatch(loadSubscriptions(data));
    } else if(response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again"}
    }
}

export const getCurrentUserSubscription = (id) => async (dispatch) => {
    const response =  await fetch(`/api/subscriptions/${id}/current`)
    const data = await response.json();
    dispatch(loadCurrentUserSubscription(data));
    return response;
}

export const getSubscriptionByTier = (tier, duration) => async (dispatch) => {
    console.log(duration)
    const response = await fetch(`/api/subscriptions/${tier}/${duration}`)
    if(response.ok) {
        const data = await response.json();

        dispatch(loadSubscriptionByTier(data));
        return data.tiers
    } else if(response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again"}
    }
}




const initialState = {};

function subscriptionReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SUBSCRIPTIONS: {
            const newState = {...state, ...action.subscriptions}
            return newState
        }
        case LOAD_CURRENT_USER_SUBSCRIPTION: {
            const newState = {...state, ...action.subscription}
            return newState
        }
        case LOAD_SUBSCRIPTION_BY_TIER: {
            const newState = {...state, ...action.tier}
            return newState
        }

        case REMOVE_SUBSCRIPTION: {
            const canceledSubscription = action.subscriptionId
            const newState = {...state, canceledSubscription}
            delete newState.canceledSubscription
            return newState
        }
        default: return state;
    }
}

export default subscriptionReducer;
