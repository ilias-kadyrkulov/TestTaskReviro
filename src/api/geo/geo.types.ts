export type TResponse = TGeoItem[]

export type TRequest = {
    city: string
    limit: number
}

export type TGeoItem = {
    name: string
    lat: number
    lon: number
}
