import { FC, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
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
    Tooltip,
    LineController
} from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'
import 'chartjs-plugin-datalabels'
import clocks from '@/assets/icons/clocks.svg'

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    annotationPlugin,
    LineController
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

    const temps = forecastData?.list.map(day => {
        const temp = Math.floor(day.main.temp)
        return temp
    })

    const data: ChartData<'line'> = {
        labels: dateTimeString,
        datasets: [
            {
                backgroundColor: '#FFC355',
                borderColor: '#FFC355',
                data: temps!,
                // datalabels: {
                //     align: 'end',
                //     anchor: 'end'
                // },
                tension: 0.4,
            }
        ]
    }

    const options: ChartOptions<'line'> = {
        scales: {
            x: {
                border: {
                    display: false
                },
                grid: {
                    display: false
                },
                // display: false
                // ticks: {
                //     callback: function (value, index, ticks) {
                //         console.log(ticks, 'x ticks')
                //         console.log(value, 'x ticks value')

                //         return index === 0 ? value : '' // Показать метку 'Now' и скрыть остальные
                //     }
                //     // stepSize: 6
                // }
            },
            y: {
                display: false
            }
        },
        plugins: {
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || ''

                        console.log(label, 'label')

                        if (label) {
                            label += ': '
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y + '°C'
                        }
                        return label
                    },
                    title: function (tooltips) {
                        console.log(tooltips, 'tooltips title')
                    }
                },
                external: function (context) {
                    console.log(context.tooltip.caretX, 'caretX external')
                },
            },
            legend: {
                display: false
            },
            datalabels: {
                align: 'start',
                anchor: 'start',
                formatter: (value, context) => {
                    console.log(context, 'datalabels context');
                    Math.round(value)
                    return value.y + '°C' // Или любой другой формат, который вам нужен
                }
            },
            annotation: {
                annotations: [
                    {
                        type: 'line',
                        yMax: 2,
                        yMin: 1,
                        borderColor: '#FFC355',
                        borderWidth: 1,
                        borderDash: [6, 6] // Делает линию пунктирной
                    }
                ]
            }
        }
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
        <div className='pt-2 pl-8 h-full bg-[#DFAE53CC] rounded-[40px]'>
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

            <Line
                data={data}
                options={options}
            />
        </div>
    )
}
