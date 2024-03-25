import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useLazyGetGeoCordsQuery } from '@/api/geo/geo.api'
import { useDebounce } from '@/hooks/useDebounce'
import { useActions } from '@/hooks/useActions'
import geo from '@/assets/icons/geo.svg'

type TProps = {}

export const CitiesDropdown: FC<TProps> = () => {
    const [value, setValue] = useState('Bishkek')
    const debouncedValue = useDebounce(value, 700)

    const [getGeoCords, { data }] = useLazyGetGeoCordsQuery()

    const { setGetCords } = useActions()

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        debouncedValue &&
            getGeoCords({ city: debouncedValue && debouncedValue, limit: 5 })
    }, [debouncedValue])

    // useEffect(() => {
    //     data && setGetCords({ city: data.city, lat: data.lat, lon: data.lon })
    // }, [data])

    return (
        <div className='relative'>
            <div className='flex'>
                <img
                    src={geo}
                    alt='Geo icon'
                />
                <input
                    className='w-24 bg-transparent px-2 text-white tracking-wide'
                    type='text'
                    value={value}
                    onChange={handleOnChange}
                />
                <div className='relative before:absolute before:left-2 before:top-2/4 before:w-3 before:h-0.5 before:rounded-xl before:bg-white before:rotate-45 after:absolute after:left-4 after:top-2/4 after:w-3 after:h-0.5 after:bg-white after:-rotate-45' />
            </div>
            {data && (
                <div className='absolute w-full top-8 left-7 bg-white rounded'>
                    <ul className='divide-y-2 p-2'>
                        {data?.map((city, idx) => (
                            <li
                                key={idx}
                                className='px-3 py-1 transition-colors duration-500 rounded hover:bg-[#D69E36] hover:text-white'
                            >
                                {city.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
