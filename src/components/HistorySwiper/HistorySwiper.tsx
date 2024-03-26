import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation, Autoplay])

export const HistorySwiper = () => {
    return (
        <Swiper
            className='my-8'
            slidesPerView={5}
            autoplay={{ delay: 5000 }}
            navigation
        >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
        </Swiper>
    )
}
