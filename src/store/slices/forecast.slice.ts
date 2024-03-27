import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type State = {
    
}

const initialState: State = {
}

export const forecastSlice = createSlice({
    name: 'forecastSlice',
    initialState,
    reducers: {
        setForecast: (state, action: PayloadAction<State>) => {
            
        },
    }
})

export const forecastSliceActions = forecastSlice.actions
export const forecastSliceReducer = forecastSlice.reducer
