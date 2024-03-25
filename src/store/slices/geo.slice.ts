import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type State = {
    city: string
    lat: number | null
    lon: number | null
}

const initialState: State = {
    city: 'Bishkek',
    lat: 42.8765615,
    lon: 74.6070079
}

export const geoSlice = createSlice({
    name: 'geoSlice',
    initialState,
    reducers: {
        setGetCords: (state, action: PayloadAction<State>) => {
            state = action.payload
        }
    }
})

export const geoSliceActions = geoSlice.actions
export const geoSliceReducer = geoSlice.reducer
