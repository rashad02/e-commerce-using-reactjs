
import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [];
console.log("aa: ", process.env.REACT_APP_NODE_ENV, process.env);
if (process.env.REACT_APP_NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store =
    configureStore({
        reducer: rootReducer, //add reducers here
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(logger),
    }) || {};

export const persistor = persistStore(store);

// export default { store, persistor };
