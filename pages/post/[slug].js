import Head from "next/head";
import { useCookies } from "react-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactToPrint from "react-to-print";

import { Fragment, useEffect, useRef, useState } from "react";
import FooterPartners from "components/footer-partners";
import Footer from "components/footer";
import HomeHeader from "components/header";
import PageHeader from "components/page-header";
import Topbar from "components/topbar";

import cssNews from "styles/News.module.css";
import css from "styles/NewsView.module.css";
import { getNews, getNewsMenus, getSlug, updateView } from "lib/news";
import { getInfo } from "lib/webinfo";
import ReactTimeAgo from "react-time-ago";
import { useNews } from "hooks/use-news";
import Spinner from "components/Spinner";
import { SimpleShareButtons } from "react-simple-share";
import { NewsSide } from "components/news-side";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";
import base from "lib/base";

export default ({ info, news, menus }) => {
  const router = useRouter();

  if (router.isFallback)
    return (
      <div>
        <Spinner />
      </div>
    );

  if (!router.isFallback && !news?.slug) {
    router.push("/404");
  }
  const componentRef = useRef();
  const { asPath } = useRouter();
  const titleCase = (str) => {
    let count = 0;
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => {
        if (count === 0) {
          count++;
          return word.charAt(0).toUpperCase() + word.slice(1);
        } else return word.charAt(0) + word.slice(1);
      })
      .join(" ");
  };

  const [cookies] = useCookies(["language"]);
  const [infoLang, setinfoLang] = useState();
  const [lang, setLang] = useState();

  useEffect(() => {
    if (info) {
      if (info[cookies.language] === undefined)
        cookies.language === "mn" ? setinfoLang("eng") : setinfoLang("mn");
      else setinfoLang(cookies.language);

      if (news[cookies.language] === undefined)
        cookies.language === "mn" ? setLang("eng") : setLang("mn");
      else setLang(cookies.language);
    }
  }, [info, news, cookies.language]);

  const parent = {
    eng: { name: "News" },
    mn: { name: "Мэдээ мэдээлэл" },
    link: "/news",
  };

  return (
    <Fragment>
      <Head>
        <title>
          {news[lang] && news[lang].name} -
          {info[infoLang] !== undefined &&
            info[infoLang].name &&
            info[infoLang].name}
        </title>
        <meta property="og:url" content={`${base.siteUrl}${asPath}`} />
        <meta
          property="og:title"
          content={`  ${news[lang] && news[lang].name} `}
        />
        <meta
          property="og:description"
          content={`${news[lang] && news[lang].shortDetails} `}
        />
        <meta name="twitter:site" content="@National_Academy_Of_Governance" />
        <meta property="og:url" content={`${base.siteUrl}${asPath}`} />
        <meta
          property="og:title"
          content={`  ${news[lang] && news[lang].name} `}
        />
        <meta
          property="og:description"
          content={`${news[lang] && news[lang].shortDetails} `}
        />
        <meta
          property="og:image"
          content={news && base.cdnUrl + news.pictures[0]}
        />
      </Head>
      <Topbar />
      <HomeHeader />
      <PageHeader
        pageTitle={cookies.language === "mn" ? "Мэдээ мэдээлэл" : "News"}
        parent={parent}
      />
      <div className={`${cssNews.Page} page animate__animated animate__fadeIn`}>
        <div className="container">
          <div className="row">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <NewsSide menus={menus} />
                </div>
                <div className="col-md-8" ref={componentRef}>
                  <div className={cssNews.NewsList}>
                    <div className={css.PageInfo}>
                      <div className={css.PageInfo__head}>
                        <h4 className={css.PageName}>
                          {news[lang] && titleCase(news[lang].name)}
                        </h4>

                        {news.pictures && news.pictures.length === 1 && (
                          <img
                            src={`${base.cdnUrl}/${news.pictures[0]}`}
                            className={css.bigImage}
                          />
                        )}

                        <Swiper
                          modules={[Navigation]}
                          autoHeight={true}
                          navigation={{
                            prevEl: ".newsViewSlider__prev",
                            nextEl: ".newsViewSlider__next",
                          }}
                          className="newsViewSlider"
                        >
                          {news.pictures &&
                            news.pictures.length > 1 &&
                            news.pictures.map((pic, index) => (
                              <SwiperSlide
                                className="newsViewSlide"
                                key={index + "nview"}
                              >
                                <img src={`${base.cdnUrl}/${pic}`} />
                              </SwiperSlide>
                            ))}
                          <div className="newsViewSlide__nav">
                            <div className="newsViewSlider__prev swiper-button-prev"></div>
                            <div className="newsViewSlider__next swiper-button-next"></div>
                          </div>
                        </Swiper>
                        <div className={css.Page__info}>
                          <div className={css.Page__infoLeft}>
                            <ReactToPrint
                              trigger={() => (
                                <div className={css.Page__print}>
                                  {" "}
                                  <i class="fa fa-print"></i>
                                  Хэвлэх
                                </div>
                              )}
                              content={() => componentRef.current}
                            />
                          </div>
                          <div className={css.Page__infoRigth}>
                            <div className={css.Page__date}>
                              <i class="fa fa-bolt"></i>
                              {news.views}
                            </div>
                            <div className={css.Page__date}>
                              <i class="fa-regular fa-clock"></i>
                              <ReactTimeAgo
                                date={news.createAt}
                                locale="mn-MN"
                              />
                            </div>
                            <div className={css.Page__share}>
                              {news[lang] && (
                                <SimpleShareButtons
                                  whitelist={[
                                    "Facebook",
                                    "Twitter",
                                    "LinkedIn",
                                    "Google+",
                                  ]}
                                  size={"16px"}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={`row ${css.Description}`}>
                        {news.type === "video" &&
                          news.videos &&
                          news.videos.map((video) => (
                            <div className="col-md-6">
                              <video
                                controls
                                src={URL.createObjectURL(
                                  `${base.cdnUrl}/${video}`
                                )}
                                className={css.Video}
                              />
                            </div>
                          ))}

                        {news.type === "audio" &&
                          news.audios &&
                          news.audios((audio) => (
                            <div className="col-md-12">
                              <audio
                                controls
                                src={URL.createObjectURL(
                                  `${base.cdnUrl}/${audio}`
                                )}
                              ></audio>
                            </div>
                          ))}
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: news[lang] && news[lang].details,
                        }}
                        className={css.Description}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterPartners />
      <Footer />
    </Fragment>
  );
};

export const getStaticProps = async ({ params }) => {
  const { info } = await getInfo();
  const { news } = await getSlug(params.slug);
  const { menus } = await getNewsMenus(`active=true`);

  return {
    props: {
      info,
      news,
      menus,
    },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  const { news } = await getNews(`active=true`);

  return {
    paths: news.map((n) => ({
      params: {
        slug: n.slug,
      },
    })),
    fallback: true,
  };
};
