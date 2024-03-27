export type TMain = {
    temp: number
    feels_like?: number
    temp_min: number
    temp_max: number
}

export type TWind = {
    speed: number
}

export type TWeather = TWeatherItem[]

export type TSys = {
    sunrise: number
    sunset: number
}

type TWeatherItem = {
    id: number
    main: TCondition
    description: string
    icon: TIcon
}

export type TClouds = {
    all: number
}

export type TCondition =
    | 'Thunderstorm'
    | 'Drizzle'
    | 'Rain'
    | 'Snow'
    | 'Mist'
    | 'Smoke'
    | 'Haze'
    | 'Dust'
    | 'Fog'
    | 'Sand'
    | 'Dust'
    | 'Ash'
    | 'Squall'
    | 'Tornado'
    | 'Clear'
    | 'Clouds'

type TIcon =
    | '01d'
    | '01n'
    | '02d'
    | '02n'
    | '03d'
    | '03n'
    | '04d'
    | '04n'
    | '09d'
    | '10d'
    | '11d'
    | '13d'
    | '50d'