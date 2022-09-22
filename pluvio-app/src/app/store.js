import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../features/userSlice"
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const persistConfig = {
    key: 'user',
    storage,
};


const persistedReducer = persistReducer(persistConfig, userReducer);


export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});