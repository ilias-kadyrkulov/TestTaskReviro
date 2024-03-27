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
            // breakpoints={{
            //     1024: {
            //         slidesPerView: 3
            //     }
            // }}
        >
            <SwiperSlide>Slide 1</SwiperSlide>
        </Swiper>
    )
}
