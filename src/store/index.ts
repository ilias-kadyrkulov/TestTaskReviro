import { forecastAPI, geoAPI, iconAPI, weatherAPI } from '@/api'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { geoSliceReducer } from './slices'

const rootReducer = combineReducers({
    [geoAPI.reducerPath]: geoAPI.reducer,
    // [iconAPI.reducerPath]: iconAPI.reducer,
    [weatherAPI.reducerPath]: weatherAPI.reducer,
    [forecastAPI.reducerPath]: forecastAPI.reducer,
    geoReducer: geoSliceReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            geoAPI.middleware,
            // iconAPI.middleware,
            weatherAPI.middleware,
            forecastAPI.middleware
        )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch