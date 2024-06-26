import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TRequest, TResponse } from './forecast.types'

export const forecastAPI = createApi({
    reducerPath: 'forecastApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.FORECAST_API_URL
    }),
    endpoints: builder => ({
        getForecast: builder.query<TResponse, TRequest>({
            query: ({ q, cnt }) => ({
                url: '',
                params: {
                    q: q,
                    units: 'metric',
                    cnt: cnt,
                    appid: process.env.API_KEY
                }
            })
        })
    })
})

export const { useLazyGetForecastQuery } = forecastAPI
