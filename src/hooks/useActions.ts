import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { bindActionCreators } from '@reduxjs/toolkit'
import { geoSliceActions, appSliceActions } from '@/store/slices/index'

const actions = {
    ...geoSliceActions,
    ...appSliceActions
}

export const useActions = () => {
    const dispatch = useTypedDispatch()

    return bindActionCreators(actions, dispatch)
}
