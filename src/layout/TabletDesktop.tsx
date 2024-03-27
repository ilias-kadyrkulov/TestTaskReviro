import { ForecastChart, HistorySwiper, WeatherNow } from '@/components'
import { activities, conditions, sidebar } from '@/lib/data'
import { clocks, heart } from '@/assets/icons'
import { user } from '@/assets/imgs'

export const TabletDesktop = () => {
    return (
        <div className='p-10 bg-[#D69E36] min-h-screen'>
            <WeatherNow />
            <div className='grid'>
                <div className='sidebar py-5'>
                    <img
                        className='w-[60px] h-[60px] mb-24'
                        src={user}
                        alt={`User's avatar`}
                    />
                    <nav>
                        <ul className='flex flex-col gap-5'>
                            {sidebar.map(setting => (
                                <li
                                    key={setting.title}
                                    className='flex flex-col items-center'
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
                    <div className='flex justify-center gap-2'>
                        <img
                            src={clocks}
                            alt='Real-time'
                        />
                        <span className='text-white font-medium text-lg leading-5'>
                            8:00PM GMT
                        </span>
                    </div>
                    <div className='my-[34px] px-4'>
                        <h3 className='text-white text-sm font-bold leading-4'>
                            AIR CONDITIONS
                        </h3>
                        <ul className='flex flex-col gap-11 mt-5'>
                            {conditions.map(condition => (
                                <li key={condition.title}>
                                    <img
                                        className='inline'
                                        src={condition.imageSrc}
                                        alt={condition.title}
                                    />
                                    <span className='text-white font-medium text-xs leading-[14px] pl-1'>
                                        {condition.title}
                                    </span>
                                    <p className='text-white font-medium text-base leading-5 pl-6'>
                                        TODO
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}