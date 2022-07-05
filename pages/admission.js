import Head from "next/head";

import { useCookies } from "react-cookie";
import Link from "next/link";

import React, { Fragment, useState } from "react";

import { useEffect } from "react/cjs/react.development";

import FooterPartners from "components/footer-partners";
import Footer from "components/footer";
import HomeHeader from "components/home-header";
import PageHeader from "components/page-header";

import cssNews from "styles/News.module.css";
import css from "styles/Page.module.css";
import { getNews, getNewsMenus, getSlug } from "lib/news";
import { getInfo } from "lib/webinfo";
import ReactTimeAgo from "react-time-ago";
import { useNews } from "hooks/use-news";
import { SimpleShareButtons } from "react-simple-share";

const Admission = () => {
  //   const router = useRouter();

  //   if (router.isFallback) return <div>Түр хүлээнэ үү ...</div>;

  //   if (!router.isFallback && !news?.slug)
  //     return <div>Уучлаарай ийм пост байхгүй байна...</div>;

  //   const [cookies] = useCookies(["language"]);
  //   const [infoLang, setinfoLang] = useState();
  //   const [lang, setLang] = useState();
  //   useEffect(() => {
  //     if (info) {
  //       if (info[cookies.language] === undefined)
  //         cookies.language === "mn" ? setinfoLang("eng") : setinfoLang("mn");
  //       else setinfoLang(cookies.language);

  //       if (news[cookies.language] === undefined)
  //         cookies.language === "mn" ? setLang("eng") : setLang("mn");
  //       else setLang(cookies.language);
  //     }
  //   }, [info, news, cookies.language]);

  //   const { news: topNews } = useNews(`limit=4&sort={ views: -1 }&star=true`);

  return (
    <Fragment>
      <Head>
        <title>
          {/* {news[lang] && news[lang].name} -
          {info[infoLang] && info[infoLang].name} */}
        </title>
      </Head>
      <HomeHeader />
      {/* <PageHeader
        pageTitle={cookies.language === "mn" ? "Мэдээ мэдээлэл" : "News"}
      /> */}
      <div className={`${cssNews.Page} animate__animated animate__fadeIn`}>
        <div className="container">
          <div className="row">
            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  <div className={cssNews.NewsList}>
                    <div className={css.PageInfo}>
                      devloping
                      {/* <div className={css.PageInfo__head}>
                        <h4 className={css.PageName}>
                          {news[lang] && news[lang].name}
                        </h4>
                        {news.pictures && (
                          <img
                            src={`https://cdn.lvg.mn/uploads/${news.pictures[0]}`}
                            className={css.bigImage}
                          />
                        )}
                        {news[lang] && (
                          <SimpleShareButtons
                            whitelist={[
                              "Facebook",
                              "Twitter",
                              "LinkedIn",
                              "Google+",
                            ]}
                            size={"25px"}
                          />
                        )}
                      </div> */}
                      {/* <div
                        dangerouslySetInnerHTML={{
                          __html: news[lang] && news[lang].details,
                        }}
                        className={css.Description}
                      ></div> */}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={`${css.Sides}`}>
                    {/* {menus && (
                      <div className={`${css.Side} `}>
                        <ul className={css.ListSub}>
                          {menus.map((menu) => {
                            let mlang;
                            if (menu[cookies.language] === undefined) {
                              if (cookies.language === "mn") {
                                mlang = "eng";
                              } else if (cookies.language === "eng") {
                                mlang = "mn";
                              }
                            } else {
                              mlang = cookies.language;
                            }
                            return (
                              <li key={menu._id}>
                                <Link href={`/n/${menu.slug}`}>
                                  <a>{menu[mlang] && menu[mlang].name}</a>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )} */}
                  </div>
                  <div className={`${css.Side} `}>
                    <div className={css.Side__title}> Эрэлтэй мэдээлэл</div>
                    <div className={css.Title__Border}></div>
                    <div className={css.Side__News}>
                      {/* {topNews &&
                        topNews.map((el, index) => {
                          let language;
                          if (el[cookies.language] === undefined) {
                            cookies.language === "mn"
                              ? (language = "eng")
                              : (language = "mn");
                          } else {
                            language = cookies.language;
                          }
                          return (
                            <a
                              href={`/news/${el.slug}`}
                              className={css.Side__Newsbox}
                              key={el._id}
                            >
                              <div className={css.News__img}>
                                <img
                                  src={`https://cdn.lvg.mn/uploads/150x150/${el.pictures[0]}`}
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
                          );
                        })} */}
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

// export const getStaticProps = async ({ params }) => {
//   const { info } = await getInfo();
//   const { news } = await getSlug(params.slug);
//   const { menus } = await getNewsMenus(`active=true`);

//   return {
//     props: {
//       info,
//       news: news && news,
//       menus,
//     },
//     revalidate: 10,
//   };
// };

// export const getStaticPaths = async () => {
//   const { news } = await getNews(`active=true`);

//   return {
//     paths: news.map((n) => ({
//       params: {
//         slug: n.slug,
//       },
//     })),
//     fallback: true,
//   };
// };

export default Admission;
