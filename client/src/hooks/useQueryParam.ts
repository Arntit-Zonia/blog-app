import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useQueryParam = (param: string) => {
  const location = useLocation();
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paramValue = searchParams.get(param);
    if (paramValue) {
      setValue(paramValue);
    }
  }, [location.search, param]);

  return value;
};

export default useQueryParam;
