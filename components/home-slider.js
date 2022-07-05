import { Fragment } from "react";
import { useBanners } from "hooks/use-banner";
import { useCookies } from "react-cookie";
import base from "lib/base";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import {
  Pagination,
  EffectFade,
  Navigation,
  Scrollbar,
  Autoplay,
} from "swiper";
import { useSocials } from "hooks/use-links";

export default () => {
  const { banners } = useBanners();
  const [cookies] = useCookies(["language"]);
  const { socialLinks } = useSocials();

  return (
    <Fragment>
      <div className="container">
        <Swiper
          modules={[EffectFade, Pagination, Navigation, Scrollbar, Autoplay]}
          effect="fade"
          autoplay={{
            delay: 5000,
          }}
          loop={true}
          pagination={{ el: ".homeSlider_pagination", clickable: true }}
          scrollbar={{
            el: ".slider__scrollbar",
            draggable: false,
          }}
          runCallbacksOnInit={true}
          navigation={{ prevEl: ".slider__prev", nextEl: ".slider__next" }}
          className="homeSlider"
        >
          {banners &&
            banners.map((banner) => {
              let lang;
              if (banner[cookies.language] === undefined) {
                if (cookies.language == "mn") lang = "eng";
                else lang = "mn";
              } else lang = cookies.language;

              return (
                <SwiperSlide>
                  <div
                    className="home-slide"
                    style={{
                      backgroundImage: `url(${base.cdnUrl}/${banner.banner})`,
                    }}
                  >
                    <div className="slider-text">
                      <div className="titlebar"> </div>
                      <h4 className="slide__title">{banner[lang].name}</h4>
                      <a
                        href={banner.link ? banner.link : "#"}
                        target="_blank "
                      >
                        <p className="slide__text">{banner[lang].details}</p>
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          <div className="homeSlider_pagination swiper-pagination"></div>{" "}
        </Swiper>
      </div>
    </Fragment>
  );
};
