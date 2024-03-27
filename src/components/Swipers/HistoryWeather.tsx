import { useEffect, useState } from 'react'
import { useLazyGetForecastQuery } from '@/api/forecast/forecast.api'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useActions } from '@/hooks/useActions'
import { clocks } from '@/assets/icons'
import { rainChance, sun, temp, wind } from '@/assets/icons'
import { TListItem } from '@/api/forecast/forecast.types'
import SwiperCore from 'swiper'
import styled from 'styled-components'
import moment from 'moment'
import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation, Autoplay])

const CustomStyles = styled.div`
    .swiper-wrapper {
        display: flex;
        transform: none;
    }
    .swiper-button-next,
    .swiper-button-prev {
        width: 20px;
        height: 20px;
        color: #f5b747;
    }
    .swiper-button-next::after,
    .swiper-button-prev::after {
        font-size: 20px;
    }
    .swiper-button-prev {
        left: 0;
    }
    .swiper-button-next {
        right: 0;
    }
    .swiper-slide {
        transition-duration: 500ms;
    }
    .swiper-slide-active {
        transform: scale(1.2);
    }

    @media (max-width: 1023px) {
        margin: 32px 0;
    }
`

export const HistorySwiper = () => {
    const { name, lat, lon } = useTypedSelector(state => state.geoReducer)
    const windowSize = useTypedSelector(state => state.appReducer.windowSize)

    const { setError, setFiveDaysForecast } = useActions()

    const [
        getFiveDaysForecast,
        { data: fiveDayaForecastData, isFetching, isSuccess }
    ] = useLazyGetForecastQuery()

    const [dayCondition, setDayCondition] = useState<TListItem | null>(null)
    console.log(dayCondition)

    const formattedTime = moment(
        dayCondition?.dt_txt,
        'YYYY-MM-DD HH:mm:ss'
    ).format('HH:mm')

    useEffect(() => {
        try {
            if (lat && lon) {
                getFiveDaysForecast({ q: name })
            }
        } catch (error: any) {
            console.error(error)
            setError(error)
        }
    }, [name, lat, lon])

    useEffect(() => {
        if (fiveDayaForecastData) {
            setDayCondition(fiveDayaForecastData.list[0])
            setFiveDaysForecast({ list: fiveDayaForecastData.list })
        }
    }, [fiveDayaForecastData])

    return (
        <>
            {isFetching && <div>Loading...</div>}
            {windowSize.width && windowSize.width >= 1024 && (
                <>
                    {isSuccess && (
                        <CustomStyles>
                            <Swiper
                                className='overflow-x-clip p-4 2xl:p-8'
                                slidesPerView={2}
                                spaceBetween={50}
                                navigation
                                onSlideChange={swiper => {
                                    const currentIndex = swiper.activeIndex
                                    console.log(currentIndex)

                                    const selectedDay =
                                        fiveDayaForecastData?.list &&
                                        fiveDayaForecastData?.list[currentIndex]

                                    if (selectedDay) {
                                        setDayCondition(selectedDay)
                                    }
                                }}
                                breakpoints={{
                                    1536: {
                                        slidesPerView: 4
                                    },
                                    1280: {
                                        slidesPerView: 3
                                    }
                                }}
                            >
                                {fiveDayaForecastData?.list?.map(day => (
                                    <SwiperSlide
                                        key={day.dt_txt}
                                        className='flex flex-col items-center'
                                    >
                                        <h5 className='font-normal leading-5 text-white text-lg'>
                                            SUN
                                        </h5>
                                        <img
                                            src={`${
                                                process.env.ICON_API_URL +
                                                '/' +
                                                day.weather[0].icon
                                            }.png`}
                                            alt={day.weather[0].main}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className='flex justify-center gap-2 mt-4'>
                                <img
                                    src={clocks}
                                    alt='Real-time'
                                />
                                <span className='text-white font-medium text-lg leading-5'>
                                    {formattedTime}PM GMT
                                </span>
                            </div>
                            <div className='my-[34px] px-4'>
                                <h3 className='text-white text-sm font-bold leading-4'>
                                    AIR CONDITIONS
                                </h3>
                                <div className='flex flex-col gap-11 mt-5'>
                                    <div>
                                        <img
                                            className='inline'
                                            src={temp}
                                            alt='Temp feels like'
                                        />
                                        <span className='text-white font-medium text-xs leading-[14px] pl-1'>
                                            Feels like
                                        </span>
                                        <p className='text-white font-medium text-base leading-5 pl-6'>
                                            {dayCondition?.main.feels_like &&
                                                Math.floor(
                                                    dayCondition.main.feels_like
                                                )}{' '}
                                            °C
                                        </p>
                                    </div>
                                    <div>
                                        <img
                                            className='inline'
                                            src={wind}
                                            alt='Wind'
                                        />
                                        <span className='text-white font-medium text-xs leading-[14px] pl-1'>
                                            Wind
                                        </span>
                                        <p className='text-white font-medium text-base leading-5 pl-6'>
                                            {(
                                                dayCondition?.wind.speed &&
                                                (dayCondition.wind.speed /
                                                    1000) *
                                                    3600
                                            )?.toLocaleString()}{' '}
                                            km/hr
                                        </p>
                                    </div>
                                    <div>
                                        <img
                                            className='inline'
                                            src={rainChance}
                                            alt='Raindrop'
                                        />
                                        <span className='text-white font-medium text-xs leading-[14px] pl-1'>
                                            Rain chance
                                        </span>
                                        <p className='text-white font-medium text-base leading-5 pl-6'>
                                            {dayCondition?.rain
                                                ? dayCondition?.rain['3h']
                                                : 0}{' '}
                                            %
                                        </p>
                                    </div>
                                    <div>
                                        <img
                                            className='inline'
                                            src={sun}
                                            alt='UV Index'
                                        />
                                        <span className='text-white font-medium text-xs leading-[14px] pl-1'>
                                            UV Index
                                        </span>
                                        <p className='text-white font-medium text-base leading-5 pl-6'>
                                            4
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CustomStyles>
                    )}
                </>
            )}
            {windowSize.width && windowSize.width < 1024 && (
                <>
                    {isSuccess && (
                        <CustomStyles>
                            <Swiper
                                className='overflow-x-clip p-4 2xl:p-8'
                                slidesPerView={5}
                                spaceBetween={50}
                                navigation
                                onSlideChange={swiper => {
                                    const currentIndex = swiper.activeIndex
                                    console.log(currentIndex)

                                    const selectedDay =
                                        fiveDayaForecastData?.list &&
                                        fiveDayaForecastData?.list[currentIndex]

                                    if (selectedDay) {
                                        setDayCondition(selectedDay)
                                    }
                                }}
                            >
                                {fiveDayaForecastData?.list?.map(day => (
                                    <SwiperSlide
                                        key={day.dt_txt}
                                        className='flex flex-col items-center'
                                    >
                                        <h5 className='font-normal leading-5 text-white text-lg'>
                                            SUN
                                        </h5>
                                        <img
                                            src={`${
                                                process.env.ICON_API_URL +
                                                '/' +
                                                day.weather[0].icon
                                            }.png`}
                                            alt={day.weather[0].main}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </CustomStyles>
                    )}
                </>
            )}
        </>
    )
}
