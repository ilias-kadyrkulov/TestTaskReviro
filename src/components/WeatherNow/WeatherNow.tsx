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
    thunderstorm,
    neutral
} from '@/assets/weather'
import moment from 'moment'
import { CitiesDropdown } from '..'

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

    //NOTE -
    const dayOfTheWeek = localTime && localTime.format('dddd') // Формат 24-часового времени

    const now = new Date()
    const currentDay = now.getDate()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

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
                windowSize.width &&
                windowSize.width < 1024 && ( //ANCHOR - <1024px
                    <>
                        {isFetching && <div>Loading...</div>}
                        {isError && <div>{error}</div>}
                        <div className='flex flex-col items-center mt-[106px]'>
                            {weatherData.weather[0].main === 'Clouds' &&
                                cloudiness && (
                                    <>
                                        <h2 className='text-5xl font-medium text-white'>
                                            Cloudy
                                        </h2>
                                        <img
                                            className='h-[200px]'
                                            src={
                                                cloudiness >= 11 &&
                                                cloudiness <= 25
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
                                    <h2 className='text-5xl font-medium text-white'>
                                        Rainy
                                    </h2>
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
                            {weatherData.weather[0].main === 'Drizzle' && (
                                <>
                                    <h2 className='text-5xl font-medium text-white'>
                                        {weatherData.weather[0].main}
                                    </h2>
                                    <img
                                        className='h-[200px]'
                                        src={heavyRain}
                                        alt='Weather now'
                                    />
                                </>
                            )}
                            {weatherData.weather[0].main === 'Snow' && (
                                <>
                                    <h2 className='text-5xl font-medium text-white'>
                                        Snowy
                                    </h2>
                                    <img
                                        className='h-[200px]'
                                        src={snow}
                                        alt='Weather now'
                                    />
                                </>
                            )}
                            {weatherData.weather[0].main === 'Clear' &&
                                weatherData.weather[0].icon === '01n' && (
                                    <>
                                        <h2 className='text-5xl font-medium text-white'>
                                            Clear
                                        </h2>
                                        <img
                                            className='h-[200px]'
                                            src={clearNight}
                                            alt='Weather now'
                                        />
                                    </>
                                )}
                            {weatherData.weather[0].main === 'Clear' &&
                                weatherData.weather[0].icon === '01d' && (
                                    <>
                                        <h2 className='text-5xl font-medium text-white'>
                                            Clear
                                        </h2>
                                        <img
                                            className='h-[200px]'
                                            src={clearDay}
                                            alt='Weather now'
                                        />
                                    </>
                                )}
                            {weatherData.weather[0].main === 'Thunderstorm' && (
                                <>
                                    <h2 className='text-5xl font-medium text-white'>
                                        Thunderstorm
                                    </h2>
                                    <img
                                        className='h-[200px]'
                                        src={thunderstorm}
                                        alt='Weather now'
                                    />
                                </>
                            )}
                            {isNeutral && (
                                <>
                                    <h2 className='text-5xl font-medium text-white'>
                                        {weatherData.weather[0].main}
                                    </h2>
                                    <img
                                        className='h-[200px]'
                                        src={neutral}
                                        alt='Weather now'
                                    />
                                </>
                            )}
                            <h1 className='text-5xl font-medium text-white mb-2'>
                                {Math.floor(weatherData.main.temp)}°C
                            </h1>
                            <p className='font-normal text-white'>
                                {dayOfTheWeek} | {currentDay}{' '}
                                {months[currentMonth]} {currentYear}
                            </p>
                        </div>
                    </>
                )}
            {weatherData &&
                windowSize.width &&
                windowSize.width >= 1024 && ( //ANCHOR - >=1024px
                    <>
                        {isError && <div>{error}</div>}
                        {isFetching && <div>Loading...</div>}
                        <div className='flex justify-between'>
                            <div className='flex flex-col pl-[60px]'>
                                <CitiesDropdown />
                                {weatherData.weather[0].main === 'Clouds' &&
                                    cloudiness && (
                                        <h2 className='text-5xl font-medium text-white'>
                                            Cloudy
                                        </h2>
                                    )}
                                {weatherData.weather[0].main === 'Rain' && (
                                    <h2 className='text-5xl font-medium text-white'>
                                        Rainy
                                    </h2>
                                )}
                                {weatherData.weather[0].main === 'Drizzle' && (
                                    <h2 className='text-5xl font-medium text-white'>
                                        {weatherData.weather[0].main}
                                    </h2>
                                )}
                                {weatherData.weather[0].main === 'Snow' && (
                                    <h2 className='text-5xl font-medium text-white'>
                                        Snowy
                                    </h2>
                                )}
                                {weatherData.weather[0].main === 'Clear' &&
                                    weatherData.weather[0].icon === '01n' && (
                                        <h2 className='text-5xl font-medium text-white'>
                                            Clear
                                        </h2>
                                    )}
                                {weatherData.weather[0].main === 'Clear' &&
                                    weatherData.weather[0].icon === '01d' && (
                                        <h2 className='text-5xl font-medium text-white'>
                                            Clear
                                        </h2>
                                    )}
                                {weatherData.weather[0].main ===
                                    'Thunderstorm' && (
                                    <h2 className='text-5xl font-medium text-white'>
                                        Thunderstorm
                                    </h2>
                                )}
                                {isNeutral && (
                                    <h2 className='text-5xl font-medium leading-[58px] text-white'>
                                        {weatherData.weather[0].main}
                                    </h2>
                                )}
                                <div className='mt-24 flex flex-col'>
                                    <h1 className='text-[64px] leading-[75px] font-medium text-white mb-2'>
                                        {Math.floor(weatherData.main.temp)}°C
                                    </h1>
                                    <p className='font-normal text-white text-lg leading-5'>
                                        {dayOfTheWeek} | {currentDay}{' '}
                                        {months[currentMonth]} {currentYear}
                                    </p>
                                </div>
                            </div>
                            <div className='w-[400px] h-[400px]'>
                                {weatherData.weather[0].main === 'Clouds' &&
                                    cloudiness && (
                                        <>
                                            <img
                                                className='h-full'
                                                src={
                                                    cloudiness >= 11 &&
                                                    cloudiness <= 25
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
                                        <img
                                            className='h-full'
                                            src={
                                                weatherData.weather[0].id >= 520
                                                    ? heavyRain
                                                    : lightRain
                                            }
                                            alt='Weather now'
                                        />
                                    </>
                                )}
                                {weatherData.weather[0].main === 'Drizzle' && (
                                    <>
                                        <img
                                            className='h-full'
                                            src={heavyRain}
                                            alt='Weather now'
                                        />
                                    </>
                                )}
                                {weatherData.weather[0].main === 'Snow' &&
                                    cloudiness && (
                                        <>
                                            <img
                                                className='h-full'
                                                src={snow}
                                                alt='Weather now'
                                            />
                                        </>
                                    )}
                                {weatherData.weather[0].main === 'Clear' &&
                                    weatherData.weather[0].icon === '01n' && (
                                        <>
                                            <img
                                                className='h-full'
                                                src={clearNight}
                                                alt='Weather now'
                                            />
                                        </>
                                    )}
                                {weatherData.weather[0].main === 'Clear' &&
                                    weatherData.weather[0].icon === '01d' && (
                                        <>
                                            <img
                                                className='h-full'
                                                src={clearDay}
                                                alt='Weather now'
                                            />
                                        </>
                                    )}
                                {weatherData.weather[0].main ===
                                    'Thunderstorm' &&
                                    cloudiness && (
                                        <>
                                            <img
                                                className='h-full'
                                                src={thunderstorm}
                                                alt='Weather now'
                                            />
                                        </>
                                    )}
                                {isNeutral && (
                                    <img
                                        className='h-full'
                                        src={neutral}
                                        alt='Weather now'
                                    />
                                )}
                            </div>
                        </div>
                    </>
                )}
        </>
    )
}
