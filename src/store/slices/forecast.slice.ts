import { TListItem, TResponse } from '@/api/forecast/forecast.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TState = {
    fiveDays: {
        list: [] | TListItem[]
    }
}

const initialState: TState = {
    fiveDays: {
        list: []
    }
}

export const forecastSlice = createSlice({
    name: 'forecastSlice',
    initialState,
    reducers: {
        setFiveDaysForecast: (state, action: PayloadAction<TResponse>) => {
            state.fiveDays.list = action.payload.list
        }
    }
})

export const forecastSliceActions = forecastSlice.actions
export const forecastSliceReducer = forecastSlice.reducer
