import { TMain, TWeather } from '../common.types'

export type TResponse = {
    list: TListItem[]
}

export type TRequest = {
    q: string
}

type TListItem = {
    dt: number
    main: TMain
    weather: TWeather
}
