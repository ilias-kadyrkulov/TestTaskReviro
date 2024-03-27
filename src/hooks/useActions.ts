import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { bindActionCreators } from '@reduxjs/toolkit'
import { geoSliceActions, appSliceActions, forecastSliceActions } from '@/store/slices/index'

const actions = {
    ...geoSliceActions,
    ...appSliceActions,
    ...forecastSliceActions,
}

export const useActions = () => {
    const dispatch = useTypedDispatch()

    return bindActionCreators(actions, dispatch)
}
