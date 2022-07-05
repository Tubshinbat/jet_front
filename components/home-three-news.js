import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import { EffectFade, Navigation, Autoplay, Scrollbar } from "swiper";
import { useNewNews } from "hooks/use-news";
import { useCookies } from "react-cookie";
import ReactTimeAgo from "react-time-ago";
import base from "lib/base";

export default () => {
  const [cookies] = useCookies(["language"]);
  const { news } = useNewNews();

  return (
    <div className="home__three_news container">
      <Swiper
        className={`news__three_slider wow animate__animated animate__fadeInUp`}
        modules={[EffectFade, Navigation, Scrollbar, Autoplay]}
        slidesPerView={6}
        loop={true}
        spaceBetween={40}
        autoplay={{
          delay: 5000,
        }}
        breakpoints={{
          1000: {
            slidesPerView: 3,
          },
          986: {
            slidesPerView: 2,
          },
          782: {
            slidesPerView: 2,
          },
          500: {
            slidesPerView: 2,
          },
          400: {
            slidesPerView: 1,
          },
          300: {
            slidesPerView: 1,
          },
          200: {
            slidesPerView: 1,
          },
        }}
        navigation={{
          prevEl: ".news__three_prev",
          nextEl: ".news__three_next",
        }}
        scrollbar={{
          el: ".news__three_scrollbar",
          draggable: false,
        }}
      >
        {news &&
          news.map((el) => {
            let lang;
            if (el[cookies.language] === undefined) {
              if (cookies.language == "mn") lang = "eng";
              else lang = "mn";
            } else lang = cookies.language;
            return (
              <SwiperSlide className={`three_slide`}>
                <Link href={`/post/${el.slug}`}>
                  <div className="news__box_t">
                    <div className="news__box_t_image">
                      <div className="news__typeBg">
                        <i
                          className={`fa-solid  ${
                            el.type === "picture" && "fa-image"
                          }  ${el.type === "video" && "fa-play"} ${
                            el.type === "audio" && "fa-music"
                          }
                          `}
                        ></i>
                      </div>

                      <img src={`${base.cdnUrl}/${el.pictures[0]}`} />
                    </div>
                    <div className="news__box_desciption">
                      <div className="news__box_date">
                        <div className={`news__date_item`}>
                          <i class="fa-regular fa-clock"></i>
                          <ReactTimeAgo date={el.createAt} locale="mn-MN" />
                        </div>
                        <div className={`news__date_item`}>
                          <i class="fa fa-bolt"></i> {el.views} үзсэн
                        </div>
                      </div>
                      <h5>{el[lang].name}</h5>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        <div className="news__three_bottom">
          <div className="news__three_scrollbar_box">
            <div className="news__three_scrollbar swiper-scrollbar"></div>
          </div>
          <div className="news__three_nav">
            <div className="news__three_prev swiper-button-prev">
              <img src="/images/prev-bl.png" />
            </div>
            <div className="news__three_next swiper-button-next">
              <img src="/images/next-bl.png" />
            </div>
          </div>
        </div>
      </Swiper>
    </div>
  );
};
