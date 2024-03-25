import { useEffect, useState } from 'react'

export const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState('')

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => clearTimeout(timeoutId)
    }, [value])

    return debouncedValue
}
