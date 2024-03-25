import { TClouds, TMain, TWeather, TWind } from "../common.types"

export type TResponse = {
    weather: TWeather
    main: TMain
    wind: TWind
    clouds: TClouds
}

export type TRequest = {
    lat: number
    lon: number
}
