import css from "styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, Fragment } from "react";
import { useMenus } from "hooks/use-menus";
import { useCookies } from "react-cookie";
import { useInfo } from "hooks/use-info";
import base from "lib/base";
import MobileHeader from "components/mobile/MobileHeader";

const Header = ({ page, text }) => {
  const [cookies, setCookie] = useCookies(["language"]);
  const [show, setShow] = useState(false);
  const [dataMenus, setDataMenus] = useState([]);
  const { menus } = useMenus();
  const { info } = useInfo();

  useEffect(() => {
    if (menus) {
      setDataMenus(menus.data);
    }
  }, [menus]);

  const changeLanguage = (lang) => {
    setCookie("language", lang, { path: "/" });
  };

  const renderCategories = (categories, child = false, parentSlug = "") => {
    let myCategories = [];
    categories &&
      categories.map((el) => {
        let lang;
        if (el[cookies.language].name === undefined) {
          if (cookies.language == "mn") lang = "eng";
          else lang = "mn";
        } else lang = cookies.language;

        myCategories.push(
          <li key={el._id} className={el.children.length > 0 && "dropMenu"}>
            {!el.isDirect && !el.model && (
              <Link href={`/p/${parentSlug}/${el.slug}`}>
                <a>{el[lang].name}</a>
              </Link>
            )}
            {el.isDirect && (
              <a href={el.direct} target="_blank">
                {el[lang].name}
              </a>
            )}
            {el.model && (
              <Link href={`/${el.model}`}>
                <a>{el[lang].name}</a>
              </Link>
            )}

            {el.children.length > 0 && !child ? (
              <ul className={`dropdownMenu`}>
                {renderCategories(el.children, true, el.slug)}
              </ul>
            ) : null}
          </li>
        );
      });

    return myCategories;
  };

  useEffect(() => {
    window.onscroll = () => {
      let header = document.querySelector(".myHeader");

      let sticky = header.offsetTop;
      if (window.pageYOffset > sticky) {
        header.classList.add(`stickyMenu`);
      } else {
        header.classList.remove(`stickyMenu`);
      }
    };
  }, []);

  const menuShow = () => {
    show ? setShow(() => false) : setShow(() => true);
  };
  return (
    <Fragment>
      <header className="myHeader">
        <div className="container">
          <div className="header">
            <div className="headerLogo">
              <Link href="/">
                <img
                  src={`${base.cdnUrl}/${
                    info[cookies.language] !== undefined
                      ? info[cookies.language].whiteLogo
                      : info[cookies.language] === "mn" && info.eng.whiteLogo
                  }`}
                />
              </Link>
            </div>
            <div className="headerMenus">
              <ul className="menus">{renderCategories(dataMenus)}</ul>
              <div className="headerApply">
                <Link href="/apply">
                  <a className="applyBtn">
                    {" "}
                    {cookies.language === "mn" ? "Бүртгүүлэх" : "Apply"}{" "}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <MobileHeader page={page} text={text} />
    </Fragment>
  );
};

export default Header;
