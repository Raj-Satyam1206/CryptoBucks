import { createContext, useLayoutEffect, useState } from "react";
import { API_OPTIONS } from "../components/constants";

// create context object
export const TrendingContext = createContext({});

// create the provider component
export const TrendingProvider = ({ children }) => {
  const [trendData, setTrendData] = useState();

  const getTrendData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search/trending` , API_OPTIONS
      );
        // .then((res) => res.json())
        // .then((json) => json);

        const data = await response.json();

      // console.log(data);
      setTrendData(data.coins);
    } catch (error) {
      console.log(error);
    }
  };

  const resetTrendingResult = () => {
    getTrendData();
  };

  useLayoutEffect(() => {
    getTrendData();
  }, []);

  return (
    <TrendingContext.Provider
      value={{
        trendData,
        resetTrendingResult,
      }}
    >
      {children}
    </TrendingContext.Provider>
  );
};
