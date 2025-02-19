import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import deeparReducer from "./deepar";
import subscriptionReducer from "./subscription";
import verificationReducer from "./verification";
import foundationReducer from "./foundation";
import brandReducer from "./brand";
import collectionReducer from "./collection";
import eyeshadowReducer from "./eyeshadow";
import lipstickReducer from "./lipstick";

const rootReducer = combineReducers({
  session: sessionReducer,
  deepar: deeparReducer,
  subscription: subscriptionReducer,
  verification: verificationReducer,
  foundation: foundationReducer,
  lipstick: lipstickReducer,
  eyeshadow: eyeshadowReducer,
  brand: brandReducer,
  collection: collectionReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
