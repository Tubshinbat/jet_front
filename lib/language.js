import { useCookies } from "react-cookie";

export const langCheck = (val) => {
  const [cookies] = useCookies(["language"]);
  let lang;
  if (val[cookies.language] === undefined) {
    if (cookies.language == "mn") lang = "eng";
    else lang = "mn";
  } else lang = cookies.language;

  return lang;
};
