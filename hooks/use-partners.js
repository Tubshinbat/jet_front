import base from "lib/base";
import useSWR from "swr";

export const usePartners = () => {
  const { data, error } = useSWR(
    `${base.apiUrl}/partners?active=true&limit=10`
  );
  let partners = [];

  if (data) {
    partners = data.data;
  }

  return {
    partners,
    isLoading: !error && !data,
    error,
  };
};
