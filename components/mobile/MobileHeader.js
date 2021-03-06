import { useInfo } from "hooks/use-info";
import base from "lib/base";
import Link from "next/link";
import { useMenus, useSocials } from "hooks/use-links";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export default ({ text, page = false }) => {
  const [cookies, setCookie] = useCookies(["language"]);
  const { menus } = useMenus();
  const { info } = useInfo();
  const [dataMenus, setDataMenus] = useState([]);
  const { socialLinks } = useSocials();
  const router = useRouter();
  const [active, setActive] = useState(false);

  const backGo = () => {
    router.back();
  };

  useEffect(() => {
    if (menus) {
      setDataMenus(menus.data);
    }
  }, [menus]);

  const changeLanguage = (lang) => {
    setCookie("language", lang, { path: "/" });
  };

  const handleToggle = () => {
    setActive((ba) => {
      if (ba === true) return false;
      else return true;
    });
  };

  const renderMenu = (categories) => {
    let myCategories = [];
    categories &&
      categories.map((el) => {
        let lang;
        if (el[cookies.language].name === undefined) {
          if (cookies.language == "mn") lang = "eng";
          else lang = "mn";
        } else lang = cookies.language;
        myCategories.push(
          <li key={el._id}>
            {!el.isDirect && !el.model && (
              <Link href={`/p/${el.slug}`}>
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
          </li>
        );
      });

    return myCategories;
  };

  return (
    <>
      <div className={`mobileHeader `}>
        <div
          className={`back-button  ${
            page === true ? "displayBlock" : "displayNone"
          }`}
          onClick={backGo}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        <div className="mid">
          {text ? (
            text
          ) : (
            <Link href="/">
              <img
                src={`${base.cdnUrl}/${
                  info[cookies.language] !== undefined
                    ? info[cookies.language].logo
                    : info[cookies.language] === "mn" && info.eng.logo
                }`}
                className="mobileLogo"
              />
            </Link>
          )}
        </div>
        <div className="burger-menu" onClick={handleToggle}>
          <span className="line"> </span>
          <span className="line"> </span>
          <span className="line"> </span>
        </div>
      </div>
      <div
        className={`menuMobile  ${
          active === true ? "displayBlock" : "displayNone"
        }`}
      >
        <h5>
          <i className="fa-solid fa-xmark" onClick={handleToggle}></i> ????????????
          ??????
        </h5>
        <ul>
          {renderMenu(dataMenus)}

          <li>
            <Link href="/apply">
              <a>????????????????????</a>
            </Link>
          </li>
        </ul>
        <div className="contactMobile">
          <li>
            <a href={`tel:${info.phone}`}> ????????: {info.phone} </a>
          </li>
          <li>
            <a href={`mailto:${info.email}`}> ??????????: {info.email} </a>
          </li>
          <li>????????: {info.address}</li>
        </div>
        <div className="socialMobile">
          {socialLinks &&
            socialLinks.map((el) => (
              <a href={el.link} key={`${el._id}-som`} target="_blank">
                <i
                  className={`fa-brands fa-${el.name.toLowerCase()}-square`}
                ></i>
              </a>
            ))}
        </div>
      </div>
      <div
        className={`menuMobile-bg ${
          active === true ? "displayBlock" : "displayNone"
        }`}
        onClick={handleToggle}
      ></div>
    </>
  );
};
