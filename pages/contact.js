import Head from "next/head";
import { useCookies } from "react-cookie";
import React, { Fragment, useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { useRouter } from "next/router";

import FooterPartners from "components/footer-partners";
import Footer from "components/footer";
import HomeHeader from "components/header";
import PageHeader from "components/page-header";
import Topbar from "components/topbar";

import cssNews from "styles/News.module.css";
import css from "styles/Page.module.css";

import {
  maxLength,
  minLength,
  onlyNumber,
  regEmail,
  requiredCheck,
} from "lib/inputRegex";

import { sendData } from "lib/contact";
import { useInfo } from "hooks/use-info";
import { getInfo } from "lib/webinfo";

const Contact = ({ info }) => {
  const router = useRouter();
  const [cookies] = useCookies(["language"]);
  const [formData, setForm] = useState({});
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
    phoneNumber: false,
  });

  const [lang, setLang] = useState();

  useEffect(() => {
    if (info) {
      if (info[cookies.language] === undefined)
        cookies.language === "mn" ? setLang("eng") : setLang("mn");
      else setLang(cookies.language);
    }
  }, [info, cookies.language]);

  //CHECK FORM FUNCTION
  const checkName = (el, name) => {
    return name === el;
  };

  const checkForm = (name, val) => {
    // Шалгах формуудаа энд тодорхойлоно
    const valueErrors = Object.keys(errors);
    let result;
    if (valueErrors.find((el) => checkName(el, name))) {
      result = requiredCheck(val);

      if (name === "name" && result === true) {
        result = minLength(val, 2);
        result === true && (result = maxLength(val, 300));
      }
      if (name === "email" && result === true) result = regEmail(val);
      if (name === "phoneNumber" && result === true) result = onlyNumber(val);
      setErrors((bfError) => ({ ...bfError, [name]: result }));
    }
  };

  const checkTrue = () => {
    let errorCount = 0;
    let errorsValues = Object.values(errors);
    errorsValues.map((el) => {
      el === true && errorCount++;
    });
    return errorsValues.length === errorCount;
  };

  const allCheck = () => {
    Object.keys(errors).map((el) => {
      checkForm(el, formData[el] === undefined ? "" : formData[el]);
    });
    return checkTrue();
  };

  // -- HANDLE CHANGE INPUT
  const handleChange = (event) => {
    let { name, value } = event.target;
    setForm((bf) => ({ ...bf, [name]: value }));
    checkForm(event.target.name, event.target.value);
  };

  const sendMsg = async () => {
    if (allCheck()) {
      const { success, error } = await sendData(formData);
      if (success) {
        toastControl("success", success);
        timer(1500);
        router.push("/");
      }
      if (error) toastControl("error", error);
    } else toastControl("error", "Талбаруудыг бөглөнө үү");
  };

  return (
    <Fragment>
      <Head>
        <title>
          {cookies.language === "mn" ? "Холбоо барих" : "Contact us"} -{" "}
          {info[lang] !== undefined && info[lang].name && info[lang].name}
        </title>
      </Head>
      <Topbar />
      <HomeHeader />
      <PageHeader
        pageTitle={cookies.language === "mn" ? "Холбоо барих" : "Contact us"}
      />
      <section className="contactSection">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="contactInfos">
                <div className="contactInfo">
                  <i className="fas fa-map-marker-alt " />
                  <p>{info[lang] && info[lang].address}</p>
                </div>
                <div className="contactInfo">
                  <i className="fas fa-phone  " />
                  <p>
                    <a href={`tel:${info.phone}`}> {info.phone}</a>
                  </p>
                </div>
                <div className="contactInfo">
                  <i className="fas fa-envelope" />
                  <p>
                    <a href={`tel:${info.email}`}> {info.email}</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row contactForm">
                <div className="form-group col-lg-12">
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${
                      errors.name === true && "is-valid"
                    }`}
                    onChange={handleChange}
                    placeholder="Таны нэр"
                  />
                  <p className="contactError"> {errors.name} </p>
                </div>
                <div className="form-group col-lg-6">
                  <input
                    type="number"
                    name="phoneNumber"
                    className={`form-control ${
                      errors.phoneNumber === true && "is-valid"
                    }`}
                    onChange={handleChange}
                    placeholder="Утасны дугаар"
                  />
                  <p className="contactError"> {errors.phoneNumber} </p>
                </div>
                <div className="form-group col-lg-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="И-мэйл хаяг"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    className={`form-control ${
                      errors.message === true && "is-valid"
                    }`}
                    placeholder="Санал хүсэлт"
                    onChange={handleChange}
                  ></textarea>
                  <p className="contactError"> {errors.message} </p>
                </div>
                <div className="contactFormFooter">
                  <button onClick={sendMsg}> Илгээх </button>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "400px",
              width: "100%",
              padding: "10px",
              boxShadow: "0px 0px 15px rgb(0 0 0 / 8%)",
            }}
            className={`wow animate__animated animate__fadeInDown`}
            data-wow-delay={`0.5s`}
          >
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyBVbaukknpuyvHnYSK_MmpI-5pcBwz83kw",
              }}
              defaultZoom={15}
              defaultCenter={
                ({
                  lat: 47.87885776692577,
                  lng: 106.85715826410991,
                },
                {
                  lat: 47.87636021644163,
                  lng: 106.85281338800124,
                })
              }
            >
              <AnyReactComponent
                lat={47.87885776692577}
                lng={106.85715826410991}
                text={<img src="/favicon.ico" style={{ width: "15px" }} />}
              />
              <AnyReactComponent
                lat={47.87636021644163}
                lng={106.85281338800124}
                text={<img src="/favicon.ico" style={{ width: "15px" }} />}
              />
            </GoogleMapReact>
          </div>
        </div>
      </section>
      <FooterPartners />
      <Footer />
    </Fragment>
  );
};

export const getStaticProps = async ({ params }) => {
  const { info } = await getInfo();

  return {
    props: {
      info,
    },
    revalidate: 10,
  };
};

export default Contact;
