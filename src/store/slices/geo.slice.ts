import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type State = {
    name: string
    lat: number | null
    lon: number | null
    error?: string | null
}

const initialState: State = {
    name: 'Bishkek',
    lat: 42.8765615,
    lon: 74.6070079,
    error: null
}

export const geoSlice = createSlice({
    name: 'geoSlice',
    initialState,
    reducers: {
        setGetCords: (state, action: PayloadAction<State>) => {
            state.name = action.payload.name
            state.lat = action.payload.lat
            state.lon = action.payload.lon
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        }
    }
})

export const geoSliceActions = geoSlice.actions
export const geoSliceReducer = geoSlice.reducer
