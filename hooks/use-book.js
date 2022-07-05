import base from "lib/base";
import useSWR from "swr";

export const useBook = () => {
  const { data, error } = useSWR(`${base.apiUrl}/books?status=true&limit=8`);
  let books = [];

  if (data) {
    books = data.data;
  }

  return {
    books,
    isLoading: !error && !data,
    error,
  };
};
