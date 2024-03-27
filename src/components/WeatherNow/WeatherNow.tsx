import { FC, useEffect, useState } from 'react'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useLazyGetWeatherQuery } from '@/api/weather/weather.api'
import moment from 'moment'
import { MobileWeatherItem } from './MobileWeatherItem'
import { DesktopWeatherItem } from './DesktopWeatherItem'

type TProps = {}

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]

export const WeatherNow: FC<TProps> = () => {
    const { windowSize } = useTypedSelector(state => state.appReducer)
    const { lat, lon } = useTypedSelector(state => state.geoReducer)
    const [cloudiness, setCloudiness] = useState<number | null>(null)
    const [error, setError] = useState<any>('')

    const [getWeather, { data: weatherData, isFetching, isError }] =
        useLazyGetWeatherQuery()

    const timestamp = weatherData?.dt //NOTE - Время запроса
    const timezoneOffset = weatherData?.timezone //NOTE - Смещение временной зоны в секундах

    //NOTE - Момент в UTC, затем добавляем смещение временной зоны
    const localTime =
        timestamp && moment.unix(timestamp).utc().add(timezoneOffset, 'seconds')

    const dayOfTheWeek = localTime && localTime.format('dddd') // Формат 24-часового времени

    const isNeutral =
        weatherData?.weather[0].main !== 'Clouds' &&
        weatherData?.weather[0].main !== 'Clear' &&
        weatherData?.weather[0].main !== 'Rain' &&
        weatherData?.weather[0].main !== 'Snow' &&
        weatherData?.weather[0].main !== 'Drizzle' &&
        weatherData?.weather[0].main !== 'Thunderstorm'

    useEffect(() => {
        try {
            if (lat && lon) {
                getWeather({ lat: lat, lon: lon })
            }
        } catch (error) {
            console.error(error)
            setError(error)
        }
        console.log(lat, lon)
    }, [lat, lon])

    useEffect(() => {
        weatherData && setCloudiness(weatherData.clouds.all)
    }, [weatherData])

    return (
        <>
            {weatherData &&
                dayOfTheWeek &&
                windowSize.width &&
                windowSize.width < 1024 && ( //ANCHOR - <1024px
                    <>
                        {isFetching && <div>Loading...</div>}
                        {isError && <div>{error}</div>}
                        <MobileWeatherItem
                            data={weatherData}
                            cloudiness={cloudiness}
                            isNeutral={isNeutral}
                            months={months}
                            dayOfTheWeek={dayOfTheWeek}
                        />
                    </>
                )}
            {weatherData &&
                windowSize.width &&
                windowSize.width >= 1024 && ( //ANCHOR - >=1024px
                    <>
                        {isError && <div>{error}</div>}
                        {isFetching && <div>Loading...</div>}
                        <DesktopWeatherItem
                            data={weatherData}
                            cloudiness={cloudiness}
                            isNeutral={isNeutral}
                            months={months}
                            dayOfTheWeek={dayOfTheWeek}
                        />
                    </>
                )}
        </>
    )
}
