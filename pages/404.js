import Head from "next/head";
import { useCookies } from "react-cookie";
import React, { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import FooterPartners from "components/footer-partners";
import Footer from "components/footer";
import HomeHeader from "components/header";
import PageHeader from "components/page-header";
import Topbar from "components/topbar";

import cssNews from "styles/News.module.css";
import css from "styles/Page.module.css";

const NotFound = ({ info }) => {
  const [cookies] = useCookies(["language"]);
  return (
    <Fragment>
      <Head>
        <title>404 Not Found</title>
      </Head>
      <Topbar />
      <HomeHeader />
      <PageHeader
        pageTitle={
          cookies.language === "mn" ? "Мэдээлэл олдсонгүй" : "Not Found"
        }
      />
      <div className={`${cssNews.Page} animate__animated animate__fadeIn`}>
        <div className="container">
          <div className="row">
            <div className="container">
              <div className="NotFound">
                <h1>404</h1>
                <h4>
                  {cookies.language === "eng"
                    ? "Oops, This Page Not Found!"
                    : "Таны хайсан хуудас олдсонгүй!"}{" "}
                </h4>
                <p>
                  {cookies.language === "eng"
                    ? "The link might be corrupted or the page may have been removed"
                    : "Та холбоос линкээ дахин нэг шалгаад дахин оролдож үзнэ үү эсвэл энэ хуудас устгагдсан"}
                </p>
                <Link href="/">
                  <button>
                    {cookies.language === "eng" ? "Home page" : "Нүүр хуудас"}
                  </button>
                </Link>
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

export default NotFound;
