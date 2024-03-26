import { TClouds, TMain, TSys, TWeather, TWind } from "../common.types"

export type TResponse = {
    weather: TWeather
    main: TMain
    wind: TWind
    clouds: TClouds
    dt: number
    sys: TSys
    timezone: number
}

export type TRequest = {
    lat: number
    lon: number
}
