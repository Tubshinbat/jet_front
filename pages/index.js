import Head from "next/head";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useState, useEffect, Fragment } from "react";

// STYLES
import css from "styles/Home.module.css";

//Libarys
import { getInfo } from "lib/webinfo";
import { langCheck } from "lib/language";
import base from "lib/base";

//Compannets
import Header from "components/header";
import Topbar from "components/topbar";
import Slider from "components/home-slider";
import HomeWelcome from "components/home-welcome";
import HomeTopNews from "components/home-top-news";
import HomeMedia from "components/home-media";
import Footer from "components/footer";
import FooterPartners from "components/footer-partners";

export default ({ info }) => {
  const [cookies] = useCookies(["language"]);
  const [lang, setLang] = useState();

  useEffect(() => {
    if (info !== undefined && info !== null) {
      if (info[cookies.language] === undefined) {
        cookies.language === "mn" ? setLang("eng") : setLang("mn");
      } else setLang(cookies.language);
    }
  }, [info, cookies.language]);

  return (
    <Fragment>
      <Head>
        <title>
          {info[langCheck(info)] !== undefined && info[langCheck(info)].name}
        </title>
        <meta property="og:url" content={`${base.siteUrl}`} />
        <meta
          property="og:title"
          content={
            info[langCheck(info)] !== undefined && info[langCheck(info)].name
          }
        />
        <meta
          property="og:description"
          content={
            info[langCheck(info)] !== undefined &&
            info[langCheck(info)].siteInfo
          }
        />
        <meta name="twitter:site" content="@JET_International_School" />
        <meta property="og:url" content={`${base.siteUrl}`} />
        <meta
          property="og:title"
          content={
            info[langCheck(info)] !== undefined && info[langCheck(info)].name
          }
        />
        <meta
          property="og:description"
          content={
            info[langCheck(info)] !== undefined &&
            info[langCheck(info)].siteInfo
          }
        />
      </Head>

      <Topbar />
      <Header />
      <Slider />

      <HomeWelcome />
      <HomeTopNews />
      <HomeMedia />
      <FooterPartners />
      <Footer />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const { info } = await getInfo();
  return {
    props: {
      info,
    },
    revalidate: 10,
  };
};
