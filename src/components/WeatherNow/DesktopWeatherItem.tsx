import { TResponse } from '@/api/weather/weather.types'
import { FC } from 'react'
import { CitiesDropdown } from '@/components/index'
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

type TProps = {
    data: TResponse
    cloudiness: number | null
    isNeutral: boolean | null
    months: string[]
    dayOfTheWeek: string | undefined | 0
}

export const DesktopWeatherItem: FC<TProps> = ({
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
        <div className='flex justify-between'>
            <div className='flex flex-col pl-[60px]'>
                <CitiesDropdown />
                {data.weather[0].main === 'Clouds' && cloudiness && (
                    <h2 className='text-5xl font-medium text-white'>Cloudy</h2>
                )}
                {data.weather[0].main === 'Rain' && (
                    <h2 className='text-5xl font-medium text-white'>Rainy</h2>
                )}
                {data.weather[0].main === 'Drizzle' && (
                    <h2 className='text-5xl font-medium text-white'>
                        {data.weather[0].main}
                    </h2>
                )}
                {data.weather[0].main === 'Snow' && (
                    <h2 className='text-5xl font-medium text-white'>Snowy</h2>
                )}
                {data.weather[0].main === 'Clear' &&
                    data.weather[0].icon === '01n' && (
                        <h2 className='text-5xl font-medium text-white'>
                            Clear
                        </h2>
                    )}
                {data.weather[0].main === 'Clear' &&
                    data.weather[0].icon === '01d' && (
                        <h2 className='text-5xl font-medium text-white'>
                            Clear
                        </h2>
                    )}
                {data.weather[0].main === 'Thunderstorm' && (
                    <h2 className='text-5xl font-medium text-white'>
                        Thunderstorm
                    </h2>
                )}
                {isNeutral && (
                    <h2 className='text-5xl font-medium leading-[58px] text-white'>
                        {data.weather[0].main}
                    </h2>
                )}
                <div className='mt-24 flex flex-col'>
                    <h1 className='text-[64px] leading-[75px] font-medium text-white mb-2'>
                        {Math.floor(data.main.temp)}°C
                    </h1>
                    <p className='font-normal text-white text-lg leading-5'>
                        {dayOfTheWeek && dayOfTheWeek} | {currentDay} {months[currentMonth]}{' '}
                        {currentYear}
                    </p>
                </div>
            </div>
            <div className='w-[400px] h-[400px]'>
                {data.weather[0].main === 'Clouds' && cloudiness && (
                    <>
                        <img
                            className='h-full'
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
                        <img
                            className='h-full'
                            src={
                                data.weather[0].id >= 520
                                    ? heavyRain
                                    : lightRain
                            }
                            alt='Weather now'
                        />
                    </>
                )}
                {data.weather[0].main === 'Drizzle' && (
                    <>
                        <img
                            className='h-full'
                            src={heavyRain}
                            alt='Weather now'
                        />
                    </>
                )}
                {data.weather[0].main === 'Snow' && cloudiness && (
                    <>
                        <img
                            className='h-full'
                            src={snow}
                            alt='Weather now'
                        />
                    </>
                )}
                {data.weather[0].main === 'Clear' &&
                    data.weather[0].icon === '01n' && (
                        <>
                            <img
                                className='h-full'
                                src={clearNight}
                                alt='Weather now'
                            />
                        </>
                    )}
                {data.weather[0].main === 'Clear' &&
                    data.weather[0].icon === '01d' && (
                        <>
                            <img
                                className='h-full'
                                src={clearDay}
                                alt='Weather now'
                            />
                        </>
                    )}
                {data.weather[0].main === 'Thunderstorm' && cloudiness && (
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
    )
}
