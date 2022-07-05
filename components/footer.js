import { useFooterMenu } from "hooks/use-menus";
import { useCookies } from "react-cookie";
import css from "styles/Footer.module.css";
import Link from "next/link";
import { useInfo } from "hooks/use-info";
import { useSocials } from "hooks/use-links";
import base from "lib/base";

const Footer = () => {
  const { menus } = useFooterMenu();
  const { info } = useInfo();
  const { socialLinks } = useSocials();
  const [cookies] = useCookies(["language"]);

  const renderCategories = (categories, child = false, parentSlug = "") => {
    let myCategories = [];
    let count = 1;
    categories &&
      categories.map((el, index) => {
        let lang;
        if (el[cookies.language].name === undefined) {
          if (cookies.language == "mn") lang = "eng";
          else lang = "mn";
        } else lang = cookies.language;
        let dly = 0.2 * index;
        myCategories.push(
          <>
            <div
              key={el._id}
              className={`${
                !child && "col-md-3"
              } wow animate__animated animate__fadeInDown`}
              data-wow-delay={`${dly}s`}
            >
              {!child && (
                <div className={css.Footer__Title}>{el[lang].name}</div>
              )}

              {!el.isDirect && !el.model && child && (
                <Link href={`/f/${parentSlug}/${el.slug}`}>
                  <a>{el[lang].name}</a>
                </Link>
              )}

              {el.isDirect && child && (
                <a href={el.direct} target="_blank">
                  {el[lang].name}
                </a>
              )}

              {el.model && child && (
                <Link href={`/${el.model}`}>
                  <a>{el[lang].name}</a>
                </Link>
              )}
              {el.children.length > 0 && !child ? (
                <ul className={css.Footer__Links}>
                  {renderCategories(el.children, true, el.slug)}
                </ul>
              ) : null}
            </div>
          </>
        );
      });

    return myCategories;
  };

  return (
    <>
      <footer className={css.Footer}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className={css.Footer__logo}>
                <img
                  src={`${base.cdnUrl}/${
                    info[cookies.language] !== undefined
                      ? info[cookies.language].whiteLogo
                      : info[cookies.language] === "mn" && info.eng.whiteLogo
                  }`}
                />
              </div>
            </div>
            {renderCategories(menus)}

            <div
              className={`col-md-3 wow animate__animated animate__fadeInDown`}
              data-wow-delay={`0.8s`}
            >
              <div className={css.Footer__contact}>
                <div className={css.Footer__contact_box}>
                  <i class="fa-solid fa-phone"></i>
                  {info.phone}
                </div>
                <div className={css.Footer__contact_box}>
                  <i class="fa-solid fa-envelope"></i>
                  {info.email}
                </div>
                <div className={css.Footer__socials}>
                  {socialLinks &&
                    socialLinks.map((el) => (
                      <a href={el.link} target="_blank">
                        <i class={`fa-brands fa-${el.name.toLowerCase()}`}></i>
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className={css.Footer__end}>
        {cookies.language === "eng"
          ? `© ${new Date().getFullYear()} Jet International School `
          : `© ${new Date().getFullYear()} Жэт Олон Улсын Сургууль`}
      </div>
    </>
  );
};

export default Footer;
