import axios from "axios-base";

export const getInfo = async () => {
  let info = {};
  let err;
  await axios
    .get("webinfo")
    .then((res) => {
      info = res.data.data;
    })
    .catch((error) => {
      err = error.status;
    });

  return { info, err };
};
