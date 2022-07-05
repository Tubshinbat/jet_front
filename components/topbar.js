import css from "styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, Fragment } from "react";
import { useMenus } from "hooks/use-menus";
import { useCookies } from "react-cookie";
import { useInfo } from "hooks/use-info";
import base from "lib/base";

import { useSocials } from "hooks/use-links";

const Topbar = () => {
  const [cookies, setCookie] = useCookies(["language"]);
  const { info } = useInfo();
  const { socialLinks } = useSocials();
  const changeLanguage = (lang) => {
    setCookie("language", lang, { path: "/" });
  };

  return (
    <Fragment>
      <div className="topbar">
        <div className="container">
          <div className="topbar-container">
            <div className="topbar-left">
              <a href="jet-english.mn" target="_blank">
                Jet School Of English
              </a>
              <a href="jetinstitute.mn " target="_blank">
                Jet Institute
              </a>
            </div>
            <div className="topbar-right">
              <ul>
                <li>
                  <Link href="/contact">
                    <a>
                      {cookies.language === "mn"
                        ? "Холбоо барих"
                        : "Contact us"}
                    </a>
                  </Link>
                </li>
                <li>
                  <a href="https://www.office.com/"> Office 365 </a>
                </li>
              </ul>
              <div className="socialLinks">
                {socialLinks &&
                  socialLinks.map((el) => (
                    <a href={el.link} target="_blank">
                      <i
                        className={`fa-brands fa-${el.name.toLowerCase()}`}
                      ></i>
                    </a>
                  ))}
              </div>

              {cookies.language === "mn" ? (
                <div
                  className="changeLan"
                  onClick={() => changeLanguage("eng")}
                >
                  <i className="fa-solid fa-globe"></i> English
                </div>
              ) : (
                <div className="changeLan" onClick={() => changeLanguage("mn")}>
                  <i className="fa-solid fa-globe"></i> Mongolia
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Topbar;
