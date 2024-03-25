import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { bindActionCreators } from '@reduxjs/toolkit'
import { geoSliceActions } from '@/store/slices/index'

const actions = {
    ...geoSliceActions
}

export const useActions = () => {
    const dispatch = useTypedDispatch()

    return bindActionCreators(actions, dispatch)
}
