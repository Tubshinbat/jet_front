import Head from "next/head";
import { useCookies } from "react-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";

import base from "lib/base";

import { Fragment, useEffect, useState } from "react";
import FooterPartners from "components/footer-partners";
import Footer from "components/footer";
import HomeHeader from "components/header";
import PageHeader from "components/page-header";

import cssNews from "styles/News.module.css";
import css from "styles/Page.module.css";
import { getNews, getNewsMenus } from "lib/news";
import { getInfo } from "lib/webinfo";
import ReactTimeAgo from "react-time-ago";
import { useNews } from "hooks/use-news";
import Spinner from "components/Spinner";
import { langCheck } from "lib/language";
import { NewsSide } from "components/news-side";
import Topbar from "components/topbar";

export default ({ info, news, menus, pagination }) => {
  const [cookies] = useCookies(["language"]);

  //-- PAGINATION
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();
  const [newsData, setNewsData] = useState([]);
  const [notFound, setNotFound] = useState();
  const [loading, setLoading] = useState(false);

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

  const router = useRouter();
  const { query, asPath } = useRouter();
  const { news: data } = useNews(news, `status=true`);

  useEffect(() => {
    if (data) {
      setNewsData(data);
    }
  }, [data]);

  useEffect(async () => {
    if (router.query) {
      setNewsData(() => []);
      setLoading(true);

      const { news, pagination } = await getNews(
        `status=true&category=${router.query.category}&sortNews=${router.query.sortNews}`
      );

      if (news && pagination) {
        setTotal(pagination.total);
        setLimit(pagination.limit);
        setNewsData(() => news);
        setLoading(false);
      } else setLoading(false);
    }
  }, [router.query]);

  useEffect(() => {
    if (pagination) {
      setTotal(pagination.total);
      setLimit(pagination.limit);
    }
  }, [pagination]);

  const handlePageChange = (pageNumber) => {
    window.scrollTo(0, 0);
    setActivePage(pageNumber);
  };

  useEffect(async () => {
    setNewsData(() => []);
    const { news } = await getNews(
      `status=true&category=${router.query.category}&sortNews=${router.query.sortNews}&page=${activePage}`
    );
    setNewsData(news);
  }, [activePage]);

  const handleSort = async (event) => {
    router.replace({
      pathname: router.pathname,
      query: { ...query, sortNews: event.target.value },
    });
  };

  return (
    <Fragment>
      <Head>
        <title>
          {cookies.language === "eng" ? "News " : "Мэдээ мэдээлэл "} -{" "}
          {info[langCheck(info)] !== undefined && info[langCheck(info)].name}
        </title>
        <meta property="og:url" content={`${base.siteUrl}${asPath}`} />
        <meta
          property="og:title"
          content={`  ${
            cookies.language === "eng" ? "News " : "Мэдээ мэдээлэл "
          } - ${" "}
            ${
              info[langCheck(info)] !== undefined && info[langCheck(info)].name
            }`}
        />
        <meta
          property="og:description"
          content={`${
            cookies.language === "eng" ? "News " : "Мэдээ мэдээлэл "
          } - ${
            info[langCheck(info)] !== undefined &&
            info[langCheck(info)].siteInfo
          }`}
        />
        <meta name="twitter:site" content="@National_Academy_Of_Governance" />
        <meta property="og:url" content={`${base.siteUrl}${asPath}`} />
        <meta
          property="og:title"
          content={`${
            cookies.language === "eng" ? "News " : "Мэдээ мэдээлэл "
          } - ${
            info[langCheck(info)] !== undefined && info[langCheck(info)].name
          }`}
        />
        <meta
          property="og:description"
          content={`${
            info[langCheck(info)] !== undefined &&
            info[langCheck(info)].siteInfo
          }`}
        />
      </Head>
      <Topbar />
      <HomeHeader />
      <PageHeader
        pageTitle={cookies.language === "mn" ? "Мэдээ мэдээлэл" : "News"}
      />

      <div className={`${cssNews.Page} page animate__animated animate__fadeIn`}>
        <div className="container">
          <div className="row">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <NewsSide menus={menus} />
                </div>
                <div className="col-md-8">
                  <div className={`section__title`}>
                    <div className="section__header">
                      <h3
                        dangerouslySetInnerHTML={{
                          __html:
                            cookies.language === "eng"
                              ? "Most Recent <span> News </span>"
                              : "Мэдээ <span> мэдээлэл </span>",
                        }}
                      ></h3>
                    </div>
                  </div>
                  <div className={cssNews.NewsList}>
                    {loading && <Spinner />}
                    {notFound && notFound}
                    {newsData &&
                      newsData.map((el) => {
                        let nlang;
                        if (el[cookies.language] === undefined) {
                          cookies.language === "mn"
                            ? (nlang = "eng")
                            : (nlang = "mn");
                        } else nlang = cookies.language;
                        return (
                          <div className={cssNews.NewsList__item} key={el.slug}>
                            <Link href={`/post/${el.slug}`}>
                              <div
                                className={`${cssNews.NewsList__imgBox} topNewsBox__image`}
                              >
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
                                  src={`${base.cdnUrl}/350x350/${el.pictures[0]}`}
                                />
                              </div>
                            </Link>
                            <div className={cssNews.NewsList__detials}>
                              <div className={cssNews.NewsList__categories}>
                                {el.categories.map((cat) => {
                                  let langCat;
                                  if (cat[cookies.language] === undefined) {
                                    cookies.language === "mn"
                                      ? (langCat = "eng")
                                      : (langCat = "mn");
                                  } else {
                                    langCat = cookies.language;
                                  }
                                  return (
                                    <a
                                      key={cat.slug}
                                      href={`/news?category=${cat._id}`}
                                      className={
                                        cssNews.NewsList__categories_item
                                      }
                                    >
                                      {cat[langCat] && cat[langCat].name}
                                    </a>
                                  );
                                })}
                              </div>
                              <Link href={`/post/${el.slug}`}>
                                <h3 className={cssNews.NewsList__name}>
                                  {el[nlang] && titleCase(el[nlang].name)}
                                </h3>
                              </Link>
                              <div className={cssNews.NewsList__info}>
                                <div className={cssNews.NewsList__date_item}>
                                  <i class="fa-regular fa-clock"></i>
                                  <ReactTimeAgo
                                    date={el.createAt}
                                    locale="mn-MN"
                                  />
                                </div>
                                <div className={cssNews.News__date_item}>
                                  <i class="fa fa-bolt"></i> {el.views} үзсэн
                                </div>
                              </div>
                              <p className={cssNews.NewsList__shortInfo}>
                                {el[nlang] && el[nlang].shortDetails}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  <div className={` ${css.Pagination} pagination`}>
                    <Pagination
                      activePage={activePage}
                      itemClass={`page-item`}
                      linkClass={"page-link"}
                      itemsCountPerPage={limit}
                      totalItemsCount={total}
                      pageRangeDisplayed={5}
                      onChange={handlePageChange.bind()}
                    />
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
  const { news, pagination } = await getNews(`status=true`);
  const { menus } = await getNewsMenus(`status=true`);

  return {
    props: {
      info,
      news,
      menus,
      pagination,
    },
    revalidate: 10,
  };
};
