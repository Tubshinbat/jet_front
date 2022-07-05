import { usePartners } from "hooks/use-partners";
import css from "styles/Partners.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";

import { Autoplay } from "swiper";
import base from "lib/base";

const Partners = () => {
  const { partners } = usePartners();
  return (
    <section className={css.Partners}>
      <div className="container">
        <div className={css.Logos}>
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 5000,
            }}
            loop={true}
            slidesPerView={5}
            breakpoints={{
              1000: {
                slidesPerView: 5,
              },
              800: {
                slidesPerView: 4,
              },
              700: {
                slidesPerView: 3,
              },
              400: {
                slidesPerView: 2,
              },
              200: {
                slidesPerView: 1,
              },
            }}
            className={css.Logos}
          >
            {partners &&
              partners.map((el, index) => {
                let count = 0.2 * index;
                return (
                  <SwiperSlide
                    className="wow animate__animated animate__fadeInUp"
                    data-wow-delay={`${count}s`}
                  >
                    <a href={el.link} target="_blank">
                      <img src={`${base.cdnUrl}/${el.logo}`} />
                    </a>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Partners;
