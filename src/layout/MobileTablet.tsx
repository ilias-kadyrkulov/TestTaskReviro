import {
    CitiesDropdown,
    ForecastChart,
    HistorySwiper,
    WeatherNow
} from '@/components'
import { user } from '@/assets/imgs'

export const MobileTablet = () => {
    return (
        <div className='p-7 bg-[#D69E36] min-h-screen'>
            <header className='flex justify-between items-center'>
                <CitiesDropdown />
                <img
                    className='w-[30px] h-[30px]'
                    src={user}
                    alt={`User's avatar`}
                />
            </header>
            <WeatherNow />
            <HistorySwiper />
            <ForecastChart />
        </div>
    )
}
