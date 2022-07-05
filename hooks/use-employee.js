import base from "lib/base";
import useSWR from "swr";

export const useEmployee = () => {
  const { data, error } = useSWR(
    `${base.apiUrl}/employees?status=true&limit=20`
  );
  let employees = [];

  if (data) {
    employees = data.data;
  }

  return {
    employees,
    isLoading: !error && !data,
    error,
  };
};
