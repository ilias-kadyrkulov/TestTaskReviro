import { forecastAPI, geoAPI, weatherAPI } from '@/api'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { appSliceReducer, geoSliceReducer } from './slices'

const rootReducer = combineReducers({
    [geoAPI.reducerPath]: geoAPI.reducer,
    [weatherAPI.reducerPath]: weatherAPI.reducer,
    [forecastAPI.reducerPath]: forecastAPI.reducer,
    geoReducer: geoSliceReducer,
    appReducer: appSliceReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            geoAPI.middleware,
            weatherAPI.middleware,
            forecastAPI.middleware
        )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
