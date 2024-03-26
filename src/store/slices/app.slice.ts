import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type State = {
    windowSize: {
        width: number | null
        height: number | null
    }
}

const initialState: State = {
    windowSize: {
        width: null,
        height: null
    }
}

export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        setWindowSize: (
            state,
            action: PayloadAction<{ width: number; height: number }>
        ) => {
            state.windowSize.width = action.payload.width
            state.windowSize.height = action.payload.height
        }
    }
})

export const appSliceActions = appSlice.actions
export const appSliceReducer = appSlice.reducer
