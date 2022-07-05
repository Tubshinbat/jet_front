import base from "lib/base";
import useSWR from "swr";

export const useTopMedia = () => {
  const { data, error } = useSWR(`${base.apiUrl}/media?status=true&limit=6`);

  let topMedia = [];
  if (data) {
    topMedia = data.data;
  }

  return {
    topMedia,
    isLoading: !error && !data,
    error,
  };
};

export const useMediaCat = (slug) => {
  const { data, error } = useSWR(`${base.apiUrl}/media-categories?${slug}`);

  let mediaCategory = [];
  if (data) {
    mediaCategory = data.data;
  }

  return {
    mediaCategory,
    isLoading: !error && !data,
    error,
  };
};

export const useMedia = (init, slug) => {
  let media = [];
  const { data, error } = useSWR(`${base.apiUrl}/media?${slug}`);

  if (data) {
    media = data.data;
  }
  return {
    media,
    isLoading: !error && !data,
    error,
  };
};

export const useNewMedia = () => {
  const { data, error } = useSWR(`${base.apiUrl}/media?status=true&limit=10`);

  let media = [];
  if (data) {
    media = data.data;
  }

  return {
    media,
    isLoading: !error && !data,
    error,
  };
};
