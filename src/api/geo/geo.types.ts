export type TResponse = TGeoItem[]

export type TRequest = {
    city: string
    limit: number
}

type TGeoItem = {
    name: string
    lat: number
    lon: number
}
