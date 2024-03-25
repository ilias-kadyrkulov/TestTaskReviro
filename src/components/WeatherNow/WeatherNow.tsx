import { FC, useEffect, useState } from 'react'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useLazyGetWeatherQuery } from '@/api/weather/weather.api'
import {
    fewClouds,
    scatteredClouds,
    lightRain,
    heavyRain,
    snow,
    clearDay,
    clearNight,
    thunderstorm
} from '@/assets/weather'

type TProps = {}

const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
]

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
    const { lat, lon } = useTypedSelector(state => state.geoReducer)

    const [cloudiness, setCloudiness] = useState<number | null>(null)

    const [getWeather, { data: weatherData, isSuccess, isFetching }] =
        useLazyGetWeatherQuery()

    const now = new Date()
    const dayTime = now.getHours()
    console.log(dayTime)

    const dayOfTheWeek = now.getDay()

    const currentDay = now.getDate()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    useEffect(() => {
        try {
            if (lat && lon) {
                getWeather({ lat: lat, lon: lon })
            }
        } catch (error) {
            console.error(error)
        }
    }, [lat, lon])

    useEffect(() => {
        weatherData && setCloudiness(weatherData.clouds.all)
    }, [weatherData])

    return (
        <>
            {isFetching && <div>Loading...</div>}
            {isSuccess && weatherData && cloudiness && (
                <div className='flex flex-col items-center mt-[106px]'>
                    {weatherData.weather[0].main === 'Clouds' && (
                        <>
                            <h2 className='text-xl font-medium text-white'>Cloudy</h2>
                            <img
                                className='h-[200px]'
                                src={
                                    cloudiness >= 11 && cloudiness <= 25
                                        ? fewClouds
                                        : cloudiness > 25
                                        ? scatteredClouds
                                        : ''
                                }
                                alt='Weather now'
                            />
                        </>
                    )}
                    {weatherData.weather[0].main === 'Rain' && (
                        <>
                            <h2 className='text-xl font-medium text-white'>Rainy</h2>
                            <img
                                className='h-[200px]'
                                src={
                                    weatherData.weather[0].id >= 520
                                        ? heavyRain
                                        : lightRain
                                }
                                alt='Weather now'
                            />
                        </>
                    )}
                    {weatherData.weather[0].main === 'Snow' && (
                        <>
                            <h2 className='text-xl font-medium text-white'>Snowy</h2>
                            <img
                                className='h-[200px]'
                                src={snow}
                                alt='Weather now'
                            />
                        </>
                    )}
                    {weatherData.weather[0].main === 'Clear' &&
                        dayTime >= 17 && (
                            <>
                                <h2 className='text-xl font-medium text-white'>Clear</h2>
                                <img
                                    className='h-[200px]'
                                    src={clearNight}
                                    alt='Weather now'
                                />
                            </>
                        )}
                    {weatherData.weather[0].main === 'Clear' &&
                        dayTime < 17 && (
                            <>
                                <h2 className='text-xl font-medium text-white'>Clear</h2>
                                <img
                                    className='h-[200px]'
                                    src={clearDay}
                                    alt='Weather now'
                                />
                            </>
                        )}
                    {weatherData.weather[0].main === 'Thunderstorm' && (
                        <>
                            <h2 className='text-xl font-medium text-white'>Thunderstorm</h2>
                            <img
                                className='h-[200px]'
                                src={thunderstorm}
                                alt='Weather now'
                            />
                        </>
                    )}
                    <h1 className='text-6xl font-medium text-white mb-2'>{Math.floor(weatherData.main.temp)}°C</h1>
                    <p className='font-normal text-white'>
                        {days[dayOfTheWeek - 1]} | {currentDay}{' '}
                        {months[currentMonth]} {currentYear}
                    </p>
                </div>
            )}
        </>
    )
}
