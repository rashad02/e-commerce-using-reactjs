
import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import logger from "redux-logger";

import rootReducer from "./root-reducer";


export const store =
    configureStore({
        reducer: rootReducer, //add reducers here
        middleware: (getDefaultMiddleware) =>
            process.env.NODE_ENV === 'development' ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware(),
    }) || {};

export const persistor = persistStore(store);
