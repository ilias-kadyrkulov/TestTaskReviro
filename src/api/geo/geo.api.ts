import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TRequest, TResponse } from './geo.types'

export const geoAPI = createApi({
    reducerPath: 'geoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.GEO_API_URL
    }),
    endpoints: builder => ({
        getGeoCords: builder.query<TResponse, TRequest>({
            query: ({ city, limit = 5 }) => ({
                url: '',
                params: {
                    q: city,
                    limit: limit,
                    appid: process.env.API_KEY
                }
            })
        })
    })
})

export const { useLazyGetGeoCordsQuery } = geoAPI
