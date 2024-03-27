import { ForecastChart, HistorySwiper, WeatherNow } from '@/components'
import { activities, sidebar } from '@/lib/data'
import { heart } from '@/assets/icons'
import { user } from '@/assets/imgs'

export const TabletDesktop = () => {
    return (
        <div className='p-10 bg-[#D69E36] min-h-screen'>
            <WeatherNow />
            <div className='grid'>
                <div className='sidebar py-5'>
                    <img
                        className='w-[60px] h-[60px] mb-24 cursor-pointer'
                        src={user}
                        alt={`User's avatar`}
                    />
                    <nav>
                        <ul className='flex flex-col gap-5'>
                            {sidebar.map(setting => (
                                <li
                                    key={setting.title}
                                    className='flex flex-col items-center cursor-pointer'
                                >
                                    <img
                                        className='w-[50px] h-[50px] mb-1'
                                        src={setting.imageSrc}
                                        alt={setting.title}
                                    />
                                    <p className='text-sm font-semibold text-white leading-4'>
                                        {setting.title}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className='activities'>
                    <div className='flex items-center gap-1'>
                        <img
                            src={heart}
                            className='w-[20px] h-[20px]'
                            alt='Activities in the area'
                        />
                        <span className='text-white font-medium text-2xl leading-7'>
                            Activities in your area
                        </span>
                    </div>
                    <ul className='flex gap-5 overflow-x-scroll'>
                        {activities.map((activity, idx) => (
                            <li key={idx} className='min-w-[150px]'>
                                <img
                                    className='w-[180px] h-[125px]'
                                    src={activity.imageSrc}
                                    alt={activity.distance}
                                />
                                <p>{activity.distance}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='forecast'>
                    <ForecastChart />
                </div>
                <div className='conditions'>
                    <HistorySwiper />
                </div>
            </div>
        </div>
    )
}
