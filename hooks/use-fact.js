import base from "lib/base";
import useSWR from "swr";

export const useFact = () => {
  const { data, error } = useSWR(`${base.apiUrl}/facts?limit=3`);
  let facts = [];
  if (data) {
    facts = data.data;
  }
  return {
    facts,
    isLoading: !error && !data,
    error,
  };
};
