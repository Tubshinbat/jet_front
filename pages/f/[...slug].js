import Footer from "components/footer";
import Partners from "components/footer-partners";
import HomeHeader from "components/home-header";
import PageHeader from "components/page-header";
import { getFooterMenu, getMenu } from "lib/menus";
import Head from "next/head";
import { useCookies } from "react-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { SimpleShareButtons } from "react-simple-share";
import ReactToPrint from "react-to-print";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import Topbar from "components/topbar";

import css from "styles/Page.module.css";
import { getFooterPage, getPage } from "lib/page";
import { useNews } from "hooks/use-news";
import ReactTimeAgo from "react-time-ago";
import base from "lib/base";

const Page = ({ menu, parent, pageData, childeMenus, sameParentMenus }) => {
  // const { page } = usePage(slug);
  const router = useRouter();
  const [slug, setSlug] = useState(router.query.slug);
  const { news } = useNews([], `limit=4&sort={ views: -1 }&star=true`);
  useEffect(() => {
    const data = router.query.slug;
    setSlug(data.join("/"));
  }, [router.query.slug]);

  const [cookies] = useCookies(["language"]);
  const [lang, setLang] = useState();
  const [plang, setPageLang] = useState();
  useEffect(() => {
    if (menu) {
      if (menu[cookies.language] === undefined) {
        if (cookies.language == "mn") setPageLang("eng");
        else setLang("mn");
      } else setLang(cookies.language);
    }
    if (pageData) {
      if (pageData[cookies.language] === undefined) {
        if (cookies.language == "mn") setPageLang("eng");
        else setPageLang("mn");
      } else setPageLang(cookies.language);
    }
  }, [menu, pageData, cookies.language]);

  const backGo = () => {
    router.back();
  };

  return (
    <Fragment>
      <Head>
        <title>
          {" "}
          {menu[lang] && menu[lang].name} - Жэт Олон Улсын Сургууль{" "}
        </title>
      </Head>
      <Topbar />
      <HomeHeader />
      <PageHeader
        pageTitle={
          (pageData[plang] && pageData[plang].name) ||
          (menu[lang] && menu[lang].name)
        }
        parent={parent}
      />
      <div className={`${css.Page} page animate__animated animate__fadeIn`}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className={`${css.Sides}`}>
                {childeMenus && (
                  <div className={`${css.Side} `}>
                    <ul className={css.ListSub}>
                      {childeMenus.map((el) => {
                        let slang;
                        if (el[cookies.language] === undefined) {
                          if (cookies.language == "mn") slang = "eng";
                          else slang = "mn";
                        } else slang = cookies.language;
                        return (
                          <li key={el._id}>
                            {!el.isDirect && !el.model && (
                              <Link href={`/f/${slug}/${el.slug}`}>
                                <a data-effect={el[slang].name}>
                                  {el[slang].name}
                                </a>
                              </Link>
                            )}
                            {el.isDirect && (
                              <a
                                href={el.direct}
                                target="_blank"
                                data-effect={el[slang].name}
                              >
                                {el[slang].name}
                              </a>
                            )}
                            {el.model && (
                              <Link href={`/${el.model}`}>
                                <a data-effect={el[slang].name}>
                                  {el[slang].name}
                                </a>
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {sameParentMenus && (
                  <div className={`${css.Side} `}>
                    <ul className={css.ListSub}>
                      {sameParentMenus.map((el) => {
                        let mslug = "" + slug;
                        mslug = mslug.split("/");
                        mslug.pop();
                        let slang;
                        if (el[cookies.language] === undefined) {
                          if (cookies.language == "mn") slang = "eng";
                          else slang = "mn";
                        } else slang = cookies.language;
                        return (
                          <li key={el._id}>
                            {!el.isDirect && !el.model && (
                              <Link href={`/f/${mslug}/${el.slug}`}>
                                <a data-effect={el[slang].name}>
                                  {el[slang].name}
                                </a>
                              </Link>
                            )}
                            {el.isDirect && (
                              <a
                                href={el.direct}
                                target="_blank"
                                data-effect={el[slang].name}
                              >
                                {el[slang].name}
                              </a>
                            )}
                            {el.model && (
                              <Link href={`/${el.model}`}>
                                <a data-effect={el[slang].name}>
                                  {el[slang].name}
                                </a>
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                <div className={`${css.Side} `}>
                  <div className={css.Side__title}>
                    {cookies.language === "eng"
                      ? "Resent news"
                      : "Эрэлтэй мэдээ"}
                  </div>
                  <div className={css.Title__Border}></div>
                  <div className={css.Side__News}>
                    {news &&
                      news.map((el, index) => {
                        let language;
                        if (el[cookies.language] === undefined) {
                          cookies.language === "mn"
                            ? (language = "eng")
                            : (language = "mn");
                        } else {
                          language = cookies.language;
                        }
                        return (
                          <Link href={`/post/${el.slug}`}>
                            <a className={css.Side__Newsbox} key={el._id}>
                              <div className={css.News__img}>
                                <img
                                  src={`${base.cdnUrl}/150x150/${el.pictures[0]}`}
                                />
                              </div>
                              <div className={css.News__detials}>
                                <div className={css.News__date}>
                                  <i class="fa-regular fa-clock"></i>{" "}
                                  <ReactTimeAgo
                                    date={el.createAt}
                                    locale="mn-MN"
                                  />
                                </div>
                                <h4 className={css.News__title}>
                                  {el[language] && el[language].name}
                                </h4>
                              </div>
                            </a>
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className={css.PageInfo}>
                <div className={css.PageInfo__head}>
                  <h4 className={css.PageName}>
                    {menu[lang] && menu[lang].name}
                  </h4>

                  <div className={css.Page__info}>
                    <div className={css.Page__infoLeft}>
                      <ReactToPrint
                        trigger={() => (
                          <div className={css.Page__print}>
                            <i class="fa fa-print"></i>
                            Хэвлэх
                          </div>
                        )}
                        content={() => componentRef.current}
                      />
                    </div>
                    <div className={css.Page__infoRigth}>
                      <div className={css.Page__share}>
                        {pageData[plang] && (
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
                      <div className={css.Page__share} onClick={backGo}>
                        <i className="fa-solid fa-arrow-left"></i>Өмнөх цэс
                      </div>
                    </div>
                  </div>
                </div>

                {pageData.pictures && pageData.pictures.length === 1 && (
                  <img
                    src={`${base.cdnUrl}/${pageData.pictures[0]}`}
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
                  {pageData.pictures &&
                    pageData.pictures.length > 1 &&
                    pageData.pictures.map((pic, index) => (
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

                <div
                  dangerouslySetInnerHTML={{
                    __html: pageData[plang] && pageData[plang].pageInfo,
                  }}
                  className={css.Description}
                ></div>
                {pageData.listActive && (
                  <div className={`row ${css.PageLists}`}>
                    {childeMenus &&
                      childeMenus.map((el) => {
                        let Llang;
                        if (el[cookies.language] === undefined) {
                          if (cookies.language == "mn") Llang = "eng";
                          else Llang = "mn";
                        } else Llang = cookies.language;

                        let link;

                        if (!el.isDirect && !el.model) {
                          link = `/f/${slug}/${el.slug}`;
                        }

                        if (el.isDirect) {
                          link = el.direct;
                        }
                        if (el.model) {
                          link = el.model;
                        }

                        return (
                          <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className={css.List__element}>
                              <a href={link}>
                                <img src="/images/list-bg.jpg" />
                              </a>
                              <div className={css.List__about}>
                                <a href={link}> {el[Llang].name} </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Partners />
      <Footer />
    </Fragment>
  );
};
export const getServerSideProps = async ({ params }) => {
  // Pass data to the page via props

  let menu = null;
  let parent = null;
  let pageData = null;
  let childeMenus = null;
  let sameParentMenus = null;

  await getFooterMenu(params.slug)
    .then((res) => {
      menu = res.menu;
      parent = res.parent;
      childeMenus = res.childeMenus;
      sameParentMenus = res.sameParentMenus;
    })
    .catch((err) => console.log(err));

  if (menu !== null) {
    await getFooterPage(menu._id)
      .then((res) => {
        pageData = res.page;
      })
      .catch((err) => console.log(err));
  }

  return { props: { menu, parent, pageData, childeMenus, sameParentMenus } };
};
export default Page;
