import axios from "axios-base";

export const getTopLink = async (slug) => {
  let topLink = {};
  let error = null;

  await axios
    .get("toplinks/slug/" + slug)
    .then((res) => {
      topLink = res.data.data;
    })
    .catch((error) => {
      error = error.status;
    });

  return { topLink, error };
};

export const getTopLinks = async (query) => {
  let topLinks = [];
  let error = null;

  await axios
    .get("toplinks?" + query)
    .then((res) => {
      topLinks = res.data.data;
    })
    .catch((error) => {
      error = error.status;
    });

  return { topLinks, error };
};
