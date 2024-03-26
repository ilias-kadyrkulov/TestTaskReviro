import { TMain, TWeather } from '../common.types'

export type TResponse = {
    list: TListItem[]
}

export type TRequest = {
    q: string
    cnt?: number
}

type TListItem = {
    dt: number
    main: TMain
    weather: TWeather
    dt_txt: string
}
