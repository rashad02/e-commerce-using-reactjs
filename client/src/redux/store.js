import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [];

if (process.env.NODE_ENV === "development") {
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
