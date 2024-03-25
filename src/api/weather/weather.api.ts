import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TRequest, TResponse } from './weather.types'

export const weatherAPI = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.WEATHER_API_URL
    }),
    endpoints: builder => ({
        getWeather: builder.query<TResponse, TRequest>({
            query: ({ lat = 42.8765615, lon = 74.6070079 }) => ({
                url: '',
                params: {
                    lat: lat,
                    lon: lon,
                    units: 'metric',
                    appid: process.env.API_KEY
                }
            })
        })
    })
})

export const { useLazyGetWeatherQuery } = weatherAPI
