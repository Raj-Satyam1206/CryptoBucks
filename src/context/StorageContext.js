/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { CryptoContext } from "./CryptoContext";
import { API_OPTIONS } from "../components/constants";

// create context object
export const StorageContext = createContext({});

// create the provider component
export const StorageProvider = ({ children }) => {
  const [allCoins, setAllCoins] = useState([]);
  const [savedData, setSavedData] = useState();

  let { currency, sortBy } = useContext(CryptoContext);

  const saveCoin = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins"));

    if (oldCoins.includes(coinId)) {
      return null;
    } else {
      let newCoin = [...oldCoins, coinId];
      setAllCoins(newCoin);
      localStorage.setItem("coins", JSON.stringify(newCoin));
    }
  };

  const removeCoin = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins"));

    let newCoin = oldCoins.filter((coin) => coin !== coinId);

    setAllCoins(newCoin);
    localStorage.setItem("coins", JSON.stringify(newCoin));
  };

  const getSavedData = async (totalCoins = allCoins) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(
          ","
        )}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`, API_OPTIONS
      )
        // .then((res) => res.json())
        // .then((json) => json);

        const data = await response.json();

      // console.log(data);
      setSavedData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetSavedResult = () => {
    getSavedData();
  };

  useEffect(() => {
    if (allCoins.length > 0) {
      getSavedData(allCoins);
    } else {
      setSavedData();
    }
  }, [allCoins]);

  useLayoutEffect(() => {
    let isThere = JSON.parse(localStorage.getItem("coins")) || false;

    if (!isThere) {
      //set the localstorage with empty array
      localStorage.setItem("coins", JSON.stringify([]));
    } else {
      //set the state with the current values from the local storage
      let totalCoins = JSON.parse(localStorage.getItem("coins"));
      setAllCoins(totalCoins);

      if (totalCoins.length > 0) {
        getSavedData(totalCoins);
      }
    }
  }, []);

  return (
    <StorageContext.Provider
      value={{
        saveCoin,
        allCoins,
        removeCoin,
        savedData,
        resetSavedResult,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};



/* 
Local Storage comes with two functions :-
1. getItem() - get the value of the item.
2. setItem() - set the value of the item.


First, Local Storage is checked if it has the item "coins" :-
JSON.parse(localStorage.getItem("coins"))

If it doesn't, localStorage is set with an empty array , otherwise a state variable is made which stores the values in the localStorage


Q. Why use JSON.parse() or JSON.stringify()
- To store a value in the Local Storage, we have to use JSON.stringify() bcoz values are in a JSON string format in the localStorage
- To access those values, we have to convert the JSON string values into a JavaScript object, that's why, use JSON.parse()

Q. How this Save works?
- We use two functions- 
  Save coin()  &&  Remove Coin()
 -Save coin() 
    - When the save button is clicked, it calls the saveCoin() with coin_id. 
    - in SaveCoin(), it checks whether the old array contains this coin with the coin_id
      - If not, then create a new array by adding this new coin with its coin_id (use JSON.stringify()) 

  -RemoveCoin()
    - take all the old coins(id) into an array and filter all the coins into the coins into a new array EXCEPT the specified coin with the coin_id.
    - Now, set the localStorage again with JSON.stringify()  
    
-   Star button is clicked and the coins are added to the local storage and then the star button remain clicked until the coins are removed from the local storage.    
*/ 

