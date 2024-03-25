import { CitiesDropdown, WeatherNow } from '@/components'
import userAvatar from '@/assets/imgs/user.png'

function App() {
    return (
        <div className='p-7 bg-[#D69E36] min-h-screen'>
            <header className='flex justify-between items-center'>
                <CitiesDropdown />
                <img
                    className='w-[30px] h-[30px]'
                    src={userAvatar}
                    alt={`User's avatar`}
                />
            </header>
            <WeatherNow />
        </div>
    )
}

export default App
