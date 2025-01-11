/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useLayoutEffect, useState } from "react";
import { API_OPTIONS } from "../components/constants";
              
// create context object
export const CryptoContext = createContext({});

// create the provider component
export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState();
  const [searchData, setSearchData] = useState();
  const [coinData, setCoinData] = useState();

  const [coinSearch, setCoinSearch] = useState("");

  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(250);
  const [perPage, setPerPage] = useState(10);


  // This is how you can do error handling by creating one state to store the error,
  // This is only for example purpose and not covered in the video
  // create one state for the error
  const [error, setError] = useState({ data: "", coinData: "", search: "" });
// there can be 3 errors that we can catch from all three functions, also send the error state 
// through value prop

  const getCryptoData = async () => { 
    //here we will set an empty string for the data error
    setError({ ...error, data: "" });
    setCryptoData();
    setTotalPages(13220);
    // try {
    //   const data = await fetch(
    //     `https://api.coingecko.com/api/v3/coins/list`
    //   )
    //     .then((res) => res.json())
    //     .then((json) => json);


    //   console.log(data);
    //   setTotalPages(data.length);
    // } catch (error) {
    //   console.log(error);
    // }


    // the Fetch API is used to make an HTTP request to the CoinGecko API endpoint (https://api.coingecko.com/api/v3/coins/list) to retrieve a list of available cryptocurrencies. Here's a breakdown of each part:

    // fetch(): This is a built-in web API provided by modern browsers for making HTTP requests. It takes a URL as its argument and returns a Promise that resolves to the Response object representing the response to the request.

    // The URL passed to the fetch() function is the endpoint of the CoinGecko API, specifically requesting the list of available cryptocurrencies.

    // .then((res) => res.json()): This is a Promise chain. It waits for the fetch request to complete and then converts the response to JSON format using the json() method of the Response object. This method also returns a Promise.

    // .then((json) => json): This is another Promise chain. It waits for the conversion to JSON to complete and then returns the JSON data. This line effectively resolves the Promise chain and returns the JSON data retrieved from the API.

    try {
      const response = await fetch(
        // `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d` , API_OPTIONS
      )
      // .then(async (res) => {
      //   if (res.ok) {
      //     return res.json();
      //   }
      //   let errorResponse = await res.json();
      //   // here we might get the error so it is best to handle it and throw the error
      //   // console.log(errorResponse);
      //   setError({ ...error, data: errorResponse.error });
      //   throw new Error(errorResponse.error);
      // }).then((json) => json);

      if (!response.ok) {
        const errorResponse = await response.json();
        setError({ ...error, data: errorResponse.error });
        throw new Error(errorResponse.error);
      }

      const data = await response.json();
      // console.log(data);
      setCryptoData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCoinData = async (coinid) => {
    setCoinData();
    try {
      const response = await fetch(
        // `https://api.coingecko.com/api/v3/coins/${coinid}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
        `https://api.coingecko.com/api/v3/coins/${coinid}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false` , API_OPTIONS
      )
        // .then((res) => res.json())
        // .then((json) => json);
        const data = await response.json();
      // console.log("CoinData", data);
      setCoinData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchResult = async (query) => {
    try {
      const response = await fetch(
        // `https://api.coingecko.com/api/v3/search?query=${query}`
        `https://api.coingecko.com/api/v3/search?query=${query}` , API_OPTIONS
      )
        // .then((res) => res.json())
        // .then((json) => json);
        const data = await response.json();
      // console.log(data);
      setSearchData(data.coins);
    } catch (error) {
      console.log(error);
    }
  };

  const resetFunction = () => {
    setPage(1);
    setCoinSearch("");
  };

  useLayoutEffect(() => {
    getCryptoData();
  }, [coinSearch, currency, sortBy, page, perPage]);

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        searchData,
        getSearchResult,
        setCoinSearch,
        setSearchData,
        currency,
        setCurrency,
        sortBy,
        setSortBy,
        page,
        setPage,
        totalPages,
        resetFunction,
        setPerPage,
        perPage,
        getCoinData,
        coinData,
        error
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};



// The value prop is passed to all the components && the components then destruct the object while using useContext() to have access to their required property.




/*
cryptoData - Main Table coins data

searchData - Search in input box, list of coins

coinSearch - Clicked a specific coin in the list of coins, details shown on the main table (getCryptoData() is called with coinSerch as id)

currency - (getCryptoData() is called with currency as currency) Whenver currency will change, due to useEffect , getCryptoData() will be called, API is called again with currency value set

sortBy -(getCryptoData() is called with order as sortBy) Whenever an option will be selected from the select tag in Filter, by the event object we will access the option selected and set the state variable (sortBy) to the option.
Whenver sortBy will change, due to useEffect , getCryptoData() will be called, API is called again with order value set  

coinData - When a coin is clicked, the coin_id is fetched through useParams() in CryptoDetails component, by useEffect , getcoinData() is called , which calls the API. 
*/


