import { TMain, TRain, TWeather, TWind } from '../common.types'

export type TResponse = {
    list: TListItem[]
}

export type TRequest = {
    q: string
    cnt?: number
}

export type TListItem = {
    dt: number
    main: TMain
    weather: TWeather
    wind: TWind
    rain?: TRain
    dt_txt: string
}
