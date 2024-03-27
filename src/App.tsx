import { useEffect } from 'react'
import { DesktopApp, MobileApp } from './layout'
import { useActions } from './hooks/useActions'
import { useTypedSelector } from './hooks/useTypedSelector'

function App() {
    const { windowSize } = useTypedSelector(state => state.appReducer)
    const appError = useTypedSelector(state => state.geoReducer.error)

    const { setWindowSize } = useActions()

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <>
            {appError && (
                <div className='relative bg-black min-h-screen'>
                    <div className='absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white font-bold text-xl text-center'>
                        {appError}
                    </div>
                </div>
            )}
            {!appError && windowSize.width && windowSize.width < 1024 && <MobileApp />}
            {!appError && windowSize.width && windowSize.width >= 1024 && <DesktopApp />}
        </>
    )
}

export default App
