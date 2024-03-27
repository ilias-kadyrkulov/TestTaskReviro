import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useLazyGetGeoCordsQuery } from '@/api/geo/geo.api'
import { useDebounce } from '@/hooks/useDebounce'
import { useActions } from '@/hooks/useActions'
import { TGeoItem } from '@/api/geo/geo.types'
import geo from '@/assets/icons/geo.svg'
import clsx from 'clsx'

type TProps = {}

export const CitiesDropdown: FC<TProps> = () => {
    const [isDrowdownClicked, setIsDropdownClicked] = useState(false)
    const [value, setValue] = useState('Bishkek')
    const debouncedValue = useDebounce(value, 500)

    const [getGeoCords, { data, isFetching, isError, error }] =
        useLazyGetGeoCordsQuery()

    const { setGetCords, setError } = useActions()

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation()
        setValue(e.target.value)
    }

    const handleOnCityClicked = (city: TGeoItem) => () => {
        setGetCords({ ...city })
        setIsDropdownClicked(false)
    }

    const handleDropdown = () => {
        setIsDropdownClicked(!isDrowdownClicked)
    }

    useEffect(() => {
        debouncedValue &&
            getGeoCords({
                city: debouncedValue && debouncedValue,
                limit: 5
            })
    }, [debouncedValue])

    useEffect(() => {
        //@ts-ignore
        isError && setError(error?.data.message)
    }, [isError])

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const input = document.getElementById('input')
            //@ts-ignore
            if (input && !input.contains(event.target)) {
                setIsDropdownClicked(false)
                console.log('dropdown false')
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)

        return () =>
            document.removeEventListener('mousedown', handleOutsideClick)
    }, [])

    return (
        <div
            className='relative lg:mb-10'
            id='input'
        >
            <div className='flex'>
                <img
                    src={geo}
                    alt='Geo icon'
                />
                <div className='flex items-center relative'>
                    <input
                        className='w-[150px] bg-transparent px-2 text-white font-medium text-2xl leading-7 tracking-wide'
                        type='text'
                        value={value}
                        onChange={handleOnChange}
                        onClick={() => setIsDropdownClicked(true)}
                    />
                    <button
                        onClick={handleDropdown}
                        className={clsx(
                            'relative w-5 h-5 before:absolute after:absolute before:transition-transform before:duration-500 after:transition-transform after:duration-500 before:left-2 before:w-3 before:h-0.5 before:rounded-xl before:bg-white after:left-4 after:w-3 after:h-0.5 after:bg-white lg:w-5 lg:h-6 lg:before:left-1 lg:before:top-1.5 lg:after:left-1 lg:after:top-3.5',
                            {
                                'before:rotate-45 after:-rotate-45':
                                    isDrowdownClicked,
                                'before:-rotate-45 after:rotate-45':
                                    !isDrowdownClicked
                            }
                        )}
                    />
                </div>
            </div>
            {isFetching && <div>Loading...</div>}
            {isDrowdownClicked && (
                <div className='absolute w-full top-8 left-7 bg-white rounded lg:top-0 lg:left-60 z-50'>
                    <ul className='divide-y-2 p-1'>
                        {data?.map((city, idx) => (
                            <button
                                onClick={handleOnCityClicked(city)}
                                className='w-full px-1 py-1'
                                key={idx}
                            >
                                <li className='transition-colors duration-500 rounded hover:bg-[#D69E36] hover:text-white'>
                                    {city.name}
                                </li>
                            </button>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
