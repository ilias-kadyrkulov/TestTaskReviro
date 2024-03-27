import { useEffect } from 'react'
import { DesktopApp, MobileApp } from './layout'
import { useActions } from './hooks/useActions'
import { useTypedSelector } from './hooks/useTypedSelector'

function App() {
    const { windowSize } = useTypedSelector(state => state.appReducer)

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

    console.log(windowSize)

    return (
        <>
            {windowSize.width && windowSize.width < 1024 && <MobileApp />}
            {windowSize.width && windowSize.width >= 1024 && <DesktopApp />}
        </>
    )
}

export default App
