import { useNews } from "hooks/use-news";
import { useState } from "react";
import { useCookies } from "react-cookie";
import css from "styles/Page.module.css";
import Link from "next/link";
import ReactTimeAgo from "react-time-ago";
import base from "lib/base";

export const NewsSide = ({ menus }) => {
  const [cookies] = useCookies(["language"]);

  const { news: topNews } = useNews(
    [],
    `limit=4&sort={ views: -1 }&star=true&status=true`
  );

  return (
    <>
      <div className={`${css.Sides}`}>
        <div className={css.Side__title}>
          {cookies.language === "eng" ? "Categories" : "Ангилал"}
        </div>
        {menus && (
          <div className={`${css.Side} `}>
            <ul className={css.ListSub}>
              {menus.map((menu) => {
                let mlang;
                if (menu[cookies.language] === undefined) {
                  cookies.language === "mn" ? (mlang = "eng") : (mlang = "mn");
                } else {
                  mlang = cookies.language;
                }
                return (
                  <li key={menu._id}>
                    <Link href={`/news/?category=${menu._id}`}>
                      <a>{menu[mlang] && menu[mlang].name}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <div className={`${css.Side} `}>
        <div className={css.Side__title}>
          {cookies.language === "eng" ? "Resent news" : "Эрэлтэй мэдээ"}
        </div>
        <div className={css.Side__News}>
          {topNews &&
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
                  href={`/post/${el.slug}`}
                  className={css.Side__Newsbox}
                  key={el._id}
                >
                  <div className={css.News__img}>
                    <img src={`${base.cdnUrl}/150x150/${el.pictures[0]}`} />
                  </div>
                  <div className={css.News__detials}>
                    <div className={css.News__date}>
                      <i class="fa-regular fa-clock"></i>{" "}
                      <ReactTimeAgo date={el.createAt} locale="mn-MN" />
                    </div>
                    <h4 className={css.News__title}>
                      {el[language] && el[language].name}
                    </h4>
                  </div>
                </a>
              );
            })}
        </div>
      </div>
    </>
  );
};
