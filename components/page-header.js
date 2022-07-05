import css from "/styles/Page.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const PageHeader = (props) => {
  const { asPath } = useRouter();
  const [slug, setSlug] = useState();
  const [lang, setLang] = useState();
  const [cookies] = useCookies(["language"]);
  useEffect(() => {
    setSlug();
    if (asPath) {
      const path = asPath.split("/");
      path.pop();
      setSlug(path.join("/"));
    }
  }, [asPath]);

  useEffect(() => {
    if (props.parent) {
      if (props.parent[cookies.language] !== undefined) {
        setLang(cookies.language);
      } else {
        if (cookies.language === "mn") setLang("eng");
        else setLang("mn");
      }
    }
  }, [props.parent, cookies.language]);

  return (
    <div className={css.PageHeader}>
      <div className="container">
        <ul className={css.Bread}>
          <li>
            <a href="/"> {cookies.language === "mn" ? "Эхлэл" : "Home"} </a>
          </li>
          {props.parent && props.parent[lang] && (
            <li>
              {
                <a href={`${!parent.link ? slug : parent.link}`}>
                  {props.parent[lang].name}
                </a>
              }
            </li>
          )}
          <li> {props.pageTitle} </li>
        </ul>
      </div>
    </div>
  );
};

export default PageHeader;
