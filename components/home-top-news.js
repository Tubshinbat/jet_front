import Section from "./generals/section";
import ReactTimeAgo from "react-time-ago";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import { Coverflow, Navigation, Autoplay, Pagination, Scrollbar } from "swiper";
// import HomeThreeNews from "./home-three-news";
import { useNews } from "hooks/use-news";
import { useCookies } from "react-cookie";

import css from "styles/HomeNews.module.css";
import { useEffect, useState } from "react";
import base from "lib/base";
export default () => {
  const [newsData, setNewsData] = useState(null);
  const [bigNews, setBigNews] = useState(null);
  const { news } = useNews([], "status=true&limit=9");
  const { news: topNews } = useNews([], "status=true&star=true&limit=4");
  const [cookies] = useCookies(["language"]);

  const langCheck = (val) => {
    let lang;
    if (val[cookies.language] === undefined) {
      if (cookies.language == "mn") lang = "eng";
      else lang = "mn";
    } else lang = cookies.language;

    return lang;
  };

  useEffect(() => {
    if (bigNews) {
      let lang;
      if (bigNews[cookies.language] === undefined) {
        if (cookies.language == "mn") lang = "eng";
        else lang = "mn";
      } else lang = cookies.language;
    }
  }, [cookies.language]);

  return (
    <>
      <Section ClassPlus={`newsNew `}>
        <div
          className="container wow animate__animated animate__fadeIn"
          data-wow-delay={`.5s`}
        >
          <div className={css.NewNews}>
            <div className={`section__title`}>
              <div className="section__header">
                <h3
                  dangerouslySetInnerHTML={{
                    __html:
                      cookies.language === "eng"
                        ? "Lastest <span> News </span>"
                        : "Шинэ <span> мэдээлэл </span>",
                  }}
                ></h3>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <Swiper
                  modules={[Pagination, Navigation, Scrollbar, Autoplay]}
                  autoplay={{
                    delay: 4000,
                  }}
                  preventInteractionOnTransition={true}
                  scrollbar={{
                    el: ".newTopNews__scrollbar",
                    draggable: true,
                  }}
                  className="newTopNews"
                >
                  {topNews &&
                    topNews.map((topNews) => (
                      <SwiperSlide
                        className="topNewSlide"
                        key={topNews._id + "top"}
                      >
                        <div className="topNewsBox">
                          <Link href={`/post/${topNews.slug}`}>
                            <div className="topNewsBox__image">
                              {topNews.type !== "default" && (
                                <div className="news__typeBg">
                                  <i
                                    className={`fa-solid  ${
                                      topNews.type === "picture" && "fa-image"
                                    }  ${
                                      topNews.type === "video" && "fa-play"
                                    } ${
                                      topNews.type === "audio" && "fa-music"
                                    }`}
                                  ></i>
                                </div>
                              )}

                              <img
                                src={`${base.cdnUrl}/450/${topNews.pictures[0]}`}
                              />
                            </div>
                          </Link>
                          <div className="topNewsBox__details">
                            <div className="newListNews__categories">
                              <div className={`newListNews__category`}>
                                <a href="#">
                                  {cookies.language === "eng"
                                    ? "Featured"
                                    : "Онцлох"}
                                </a>
                              </div>
                            </div>
                            <Link href={`/post/${topNews.slug}`}>
                              <h4> {topNews[langCheck(topNews)].name}</h4>
                            </Link>
                            <div className="topNewsBox__dateViews">
                              <div className={`topNewsBox__time`}>
                                <i className="fa fa-clock"></i>
                                <ReactTimeAgo
                                  date={topNews.createAt}
                                  locale="mn-MN"
                                />
                              </div>
                              <div className={`topNewsBox__views`}>
                                <i className="fa fa-bolt"></i> {topNews.views}{" "}
                                үзсэн
                              </div>
                            </div>
                            <p>
                              {topNews[langCheck(topNews)].shortDetails &&
                                topNews[
                                  langCheck(topNews)
                                ].shortDetails.substring(0, 150)}
                              ...
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
              <div className="col-lg-6 col-md-12 mobile-newNews">
                <Swiper
                  modules={[Pagination, Navigation, Scrollbar, Autoplay]}
                  autoplay={{
                    delay: 5000,
                  }}
                  preventInteractionOnTransition={true}
                  className="newTopNews"
                >
                  {news &&
                    news.map((topNews) => (
                      <SwiperSlide
                        className="topNewSlide"
                        key={topNews._id + "top"}
                      >
                        <div className="topNewsBox">
                          <Link href={`/post/${topNews.slug}`}>
                            <div className="topNewsBox__image">
                              {topNews.type !== "default" && (
                                <div className="news__typeBg">
                                  <i
                                    className={`fa-solid  ${
                                      topNews.type === "picture" && "fa-image"
                                    }  ${
                                      topNews.type === "video" && "fa-play"
                                    } ${
                                      topNews.type === "audio" && "fa-music"
                                    }`}
                                  ></i>
                                </div>
                              )}

                              <img
                                src={`${base.cdnUrl}/450/${topNews.pictures[0]}`}
                              />
                            </div>
                          </Link>
                          <div className="topNewsBox__details">
                            <Link href={`/post/${topNews.slug}`}>
                              <h4> {topNews[langCheck(topNews)].name}</h4>
                            </Link>
                            <div className="topNewsBox__dateViews">
                              <div className={`topNewsBox__time`}>
                                <i className="fa fa-clock"></i>
                                <ReactTimeAgo
                                  date={topNews.createAt}
                                  locale="mn-MN"
                                />
                              </div>
                              <div className={`topNewsBox__views`}>
                                <i className="fa fa-bolt"></i> {topNews.views}{" "}
                                үзсэн
                              </div>
                            </div>
                            <p>
                              {topNews[langCheck(topNews)].shortDetails &&
                                topNews[
                                  langCheck(topNews)
                                ].shortDetails.substring(0, 150)}
                              ...
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="home-newNews">
                  <Swiper
                    direction={"vertical"}
                    modules={[Autoplay, Navigation]}
                    slidesPerView={3}
                    mousewheel={{
                      releaseOnEdges: false,
                    }}
                    navigation={{
                      prevEl: ".newNewsSlider__prev",
                      nextEl: ".newNewsSlider__next",
                    }}
                    autoplay={{
                      delay: 5000,
                    }}
                    className="newNews-swiper"
                  >
                    {news &&
                      news.map((el) => (
                        <SwiperSlide
                          className="newNewsSlide"
                          key={el._id + "new"}
                        >
                          <div className="newListNews">
                            <div className="newListNews__about">
                              <div className="newListNews__categories">
                                {el.categories[0] && (
                                  <div className={`newListNews__category`}>
                                    <a href="/news?category=${el.slug}">
                                      {el.categories[0][cookies.language] !==
                                        undefined &&
                                        el.categories[0][cookies.language].name}
                                    </a>
                                  </div>
                                )}
                              </div>
                              <div className="newListNews__title">
                                <Link href={`/post/${el.slug}`}>
                                  {el[langCheck(el)].name}
                                </Link>
                              </div>
                              <div className="topNewsBox__dateViews">
                                <div className={`topNewsBox__time`}>
                                  <i className="fa fa-clock"></i>
                                  <ReactTimeAgo
                                    date={el.createAt}
                                    locale="mn-MN"
                                  />
                                </div>
                                <div className={`topNewsBox__views`}>
                                  <i className="fa fa-bolt"></i> {el.views}{" "}
                                  үзсэн
                                </div>
                              </div>
                              <p>
                                {el[langCheck(el)].shortDetails &&
                                  el[langCheck(el)].shortDetails.substring(
                                    0,
                                    150
                                  )}
                                ...
                              </p>
                            </div>
                            <Link href={`/post/${el.slug}`}>
                              <div className="newListNews__image topNewsBox__image">
                                {el.type !== "default" && (
                                  <div className="news__typeBg">
                                    <i
                                      className={`fa-solid  ${
                                        el.type === "picture" && "fa-image"
                                      }  ${el.type === "video" && "fa-play"} ${
                                        el.type === "audio" && "fa-music"
                                      }`}
                                    ></i>
                                  </div>
                                )}
                                <img
                                  src={`${base.cdnUrl}/450/${el.pictures[0]}`}
                                />
                              </div>
                            </Link>
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};
