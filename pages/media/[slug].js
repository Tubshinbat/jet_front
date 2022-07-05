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

import { getInfo } from "lib/webinfo";
import ReactTimeAgo from "react-time-ago";

import Spinner from "components/Spinner";
import { SimpleShareButtons } from "react-simple-share";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";
import { getMedia, getMediaMenus, getSlug } from "lib/media";
import { MediaSide } from "components/media-side";
import base from "lib/base";

export default ({ info, media, menus }) => {
  const router = useRouter();

  if (router.isFallback)
    return (
      <div>
        <Spinner />
      </div>
    );

  if (!router.isFallback && !media?.slug) {
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

      if (media[cookies.language] === undefined)
        cookies.language === "mn" ? setLang("eng") : setLang("mn");
      else setLang(cookies.language);
    }
  }, [info, media, cookies.language]);

  const parent = {
    eng: { name: "Media" },
    mn: { name: "Медиа контент" },
    link: "/medias",
  };

  return (
    <Fragment>
      <Head>
        <title>
          {media[lang] && media[lang].name} -
          {info[infoLang] !== undefined &&
            info[infoLang].name &&
            info[infoLang].name}
        </title>
        <meta property="og:url" content={`${base.siteUrl}${asPath}`} />
        <meta
          property="og:title"
          content={`  ${media[lang] && media[lang].name} `}
        />
        <meta
          property="og:description"
          content={`${media[lang] && media[lang].shortDetails} `}
        />
        <meta name="twitter:site" content="@National_Academy_Of_Governance" />
        <meta property="og:url" content={`${base.siteUrl}${asPath}`} />
        <meta
          property="og:title"
          content={`  ${media[lang] && media[lang].name} `}
        />
        <meta
          property="og:description"
          content={`${media[lang] && media[lang].shortDetails} `}
        />
        <meta
          property="og:image"
          content={media && "https://cdn.lvg.mn/uploads/" + media.pictures[0]}
        />
      </Head>
      <Topbar />
      <HomeHeader />
      <PageHeader
        pageTitle={
          cookies.language === "mn" ? "Медиа контент" : "Media content"
        }
        parent={parent}
      />
      <div className={`${cssNews.Page} animate__animated animate__fadeIn`}>
        <div className="container">
          <div className="row">
            <div className="container">
              <div className="row">
                <div className="col-md-8" ref={componentRef}>
                  <div className={cssNews.NewsList}>
                    <div className={css.PageInfo}>
                      <div className={css.PageInfo__head}>
                        <h4 className={css.PageName}>
                          {media[lang] && titleCase(media[lang].name)}
                        </h4>

                        {media.pictures && media.pictures.length === 1 && (
                          <img
                            src={`${base.cdnUrl}/${media.pictures[0]}`}
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
                          {media.pictures &&
                            media.pictures.length > 1 &&
                            media.pictures.map((pic, index) => (
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
                              {media.views}
                            </div>
                            <div className={css.Page__date}>
                              <i class="fa-regular fa-clock"></i>
                              <ReactTimeAgo
                                date={media.createAt}
                                locale="mn-MN"
                              />
                            </div>
                            <div className={css.Page__share}>
                              {media[lang] && (
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
                        {media.type === "video" &&
                          media.videos &&
                          media.videos.map((video) => (
                            <div className="col-md-12">
                              <video
                                controls
                                src={`${base.cdnUrl}/${video}`}
                                className={css.Video}
                              />
                            </div>
                          ))}

                        {media.type === "audio" &&
                          media.audios &&
                          media.audios.map((audio) => (
                            <div className="col-md-12">
                              <audio
                                controls
                                src={`${base.cdnUrl}/${audio}`}
                              ></audio>
                            </div>
                          ))}
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: media[lang] && media[lang].details,
                        }}
                        className={css.Description}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <MediaSide menus={menus} />
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
  const { media } = await getSlug(params.slug);
  const { menus } = await getMediaMenus(`active=true`);

  return {
    props: {
      info,
      media,
      menus,
    },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  const { media } = await getMedia(`active=true`);

  return {
    paths: media.map((n) => ({
      params: {
        slug: n.slug,
      },
    })),
    fallback: true,
  };
};
