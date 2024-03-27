import { FC } from 'react'
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
import { TResponse } from '@/api/weather/weather.types'

type TProps = {
    data: TResponse
    cloudiness: number
    isNeutral: boolean
    months: string[]
    dayOfTheWeek: string | undefined | 0
}

export const WeatherItem: FC<TProps> = ({
    data,
    cloudiness,
    isNeutral,
    months,
    dayOfTheWeek
}) => {
    const now = new Date()
    const currentDay = now.getDate()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    return (
        <div className='flex flex-col items-center mt-[106px]'>
            {data.weather[0].main === 'Clouds' && cloudiness && (
                <>
                    <h2 className='text-5xl font-medium text-white'>Cloudy</h2>
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
            {data.weather[0].main === 'Rain' && (
                <>
                    <h2 className='text-5xl font-medium text-white'>Rainy</h2>
                    <img
                        className='h-[200px]'
                        src={data.weather[0].id >= 520 ? heavyRain : lightRain}
                        alt='Weather now'
                    />
                </>
            )}
            {data.weather[0].main === 'Drizzle' && (
                <>
                    <h2 className='text-5xl font-medium text-white'>
                        {data.weather[0].main}
                    </h2>
                    <img
                        className='h-[200px]'
                        src={heavyRain}
                        alt='Weather now'
                    />
                </>
            )}
            {data.weather[0].main === 'Snow' && (
                <>
                    <h2 className='text-5xl font-medium text-white'>Snowy</h2>
                    <img
                        className='h-[200px]'
                        src={snow}
                        alt='Weather now'
                    />
                </>
            )}
            {data.weather[0].main === 'Clear' &&
                data.weather[0].icon === '01n' && (
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
            {data.weather[0].main === 'Clear' &&
                data.weather[0].icon === '01d' && (
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
            {data.weather[0].main === 'Thunderstorm' && (
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
                        {data.weather[0].main}
                    </h2>
                    <img
                        className='h-[200px]'
                        src={neutral}
                        alt='Weather now'
                    />
                </>
            )}
            <h1 className='text-5xl font-medium text-white mb-2'>
                {Math.floor(data.main.temp)}°C
            </h1>
            <p className='font-normal text-white'>
                {dayOfTheWeek} | {currentDay} {months[currentMonth]}{' '}
                {currentYear}
            </p>
        </div>
    )
}
