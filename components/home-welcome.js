import { useCookies } from "react-cookie";
import { useInfo } from "hooks/use-info";
import { useState, useEffect } from "react";

export default () => {
  const [cookies] = useCookies(["language"]);
  const { info } = useInfo();
  const [lang, setLang] = useState("mn");

  useEffect(() => {
    let lang;
    if (info[lang] && info[cookies.language].name === undefined) {
      if (cookies.language == "mn") setLang("eng");
      else setLang("mn");
    } else setLang(cookies.language);
  }, [cookies]);

  return (
    <>
      <section className="welcome-section">
        <div className="container">
          <h2> {info[lang] && info[lang].name} </h2>
          <div
            className="welcome-message"
            dangerouslySetInnerHTML={{
              __html: info[lang] && info[lang].siteInfo,
            }}
          ></div>
        </div>
      </section>
    </>
  );
};
