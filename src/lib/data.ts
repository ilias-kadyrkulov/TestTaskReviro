import {
    explore,
    geo,
    settings,
    weather
} from '@/assets/icons'
import {
    activityFour,
    activityOne,
    activityThree,
    activityTwo
} from '@/assets/imgs'

export const sidebar = [
    { title: 'weather', imageSrc: weather },
    { title: 'explore', imageSrc: explore },
    { title: 'cities', imageSrc: geo },
    { title: 'settings', imageSrc: settings }
]

export const activities = [
    { distance: '2km', imageSrc: activityOne },
    { distance: '1.5km', imageSrc: activityTwo },
    { distance: '3km', imageSrc: activityThree },
    { distance: '500m', imageSrc: activityFour }
]
