import axios from "axios-base";

export const getMedia = async (query) => {
  let data = [];
  let error = null;
  let pagination = null;
  await axios
    .get("media?" + query)
    .then((res) => {
      data = res.data.data;
      pagination = res.data.pagination;
    })
    .catch((err) => {
      error = err.status;
    });

  return { media: data, error, pagination };
};

export const getSlug = async (slug) => {
  let media;
  let error = null;
  media = await axios
    .get(`media/s/${slug}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      error = err.status;
    });

  return { media, error };
};

export const getMediaMenus = async (query) => {
  let menus = [];
  let error = null;
  await axios
    .get("media-categories?" + query)
    .then((res) => {
      menus = res.data.data;
    })
    .catch((err) => {
      error = err.status;
    });

  return { menus, error };
};

export const updateView = async (slug) => {
  let data = {};
  let error;
  await axios
    .get(`media/view/${slug}`)
    .then((res) => {
      data = res.data.data;
    })
    .catch((err) => {
      error = err.status;
    });

  return { views: data, error };
};
