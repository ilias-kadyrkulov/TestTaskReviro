import { FC, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import clocks from '@/assets/icons/clocks.svg'
import { useLazyGetForecastQuery } from '@/api/forecast/forecast.api'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useActions } from '@/hooks/useActions'
import moment from 'moment'
import {
    CategoryScale,
    Chart,
    ChartData,
    ChartOptions,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip
} from 'chart.js'

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

interface IChartProps {
    data: ChartData<'line'>
    options?: ChartOptions<'line'>
}

export const ForecastChart: FC = () => {
    const { name, lat, lon } = useTypedSelector(state => state.geoReducer)

    const { setError } = useActions()

    const [getForecast, { data: forecastData, isFetching }] =
        useLazyGetForecastQuery()

    const dateTimeString = forecastData?.list.map(interval => {
        const formattedTime = moment(
            interval.dt_txt,
            'YYYY-MM-DD HH:mm:ss'
        ).format('HH:mm')

        return formattedTime
    })

    const data: IChartProps = {
        data: {
            labels: dateTimeString,
            datasets: [
                {
                    data: [2],
                    tension: 0.4
                }
            ]
        }
    }

    const options = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    drawBorder: false,
                    display: false
                },
                ticks: {
                    // Здесь можно настроить отображение меток по оси X
                }
            },
            y: {
                grid: {
                    drawBorder: false,
                    display: false
                },
                ticks: {
                    // Здесь можно настроить отображение меток по оси Y
                }
            }
        },
        plugins: {
            legend: {
                display: false // Это скроет легенду
            },
            tooltip: {
                enabled: false // Это отключит всплывающие подсказки
            }
        }
        // Дополнительные настройки могут быть добавлены здесь
    }

    useEffect(() => {
        try {
            if (lat && lon) {
                getForecast({ q: name, cnt: 9 })
            }
        } catch (error: any) {
            console.error(error)
            setError(error)
        }
        console.log('forecast')
    }, [name, lat, lon])

    return (
        <div className='p-2 rounded-sm bg-[#DFAE53CC]'>
            <div className='flex item'>
                <img
                    src={clocks}
                    alt="Clocks' icon"
                />
                <span className='text-sm text-white font-medium ml-[5px]'>
                    24-hour forecast
                </span>
            </div>
            {isFetching && <div>Loading...</div>}

            <Line {...data} options={options} />
        </div>
    )
}
