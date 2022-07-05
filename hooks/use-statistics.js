import base from "lib/base";
import useSWR from "swr";

export const useStatistics = () => {
  const { data, error } = useSWR(`${base.apiUrl}/statistics/active`);
  let activeStatistic = {};
  if (data) {
    activeStatistic = data.data;
  }
  return {
    activeStatistic,
    isLoading: !error && !data,
    error,
  };
};

export const useSubStatistics = (id) => {
  let subStatistics = [];

  const { data, error } = useSWR(
    `${base.apiUrl}/statisticssub?main=${id}&limit=3`
  );

  if (data) {
    subStatistics = data.data;
  }

  return {
    subStatistics,
    isLoading: !error && !subStatistics,
    error,
  };
};
