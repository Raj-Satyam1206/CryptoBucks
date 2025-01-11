import React, { useLayoutEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useContext } from "react";
import { CryptoContext } from "./../context/CryptoContext";
import { API_OPTIONS } from "./constants";

function CustomTooltip({ payload, label, active, currency = "usd" }) {
  if (active && payload && payload.length > 0) {
    return (
      <div className="custom-tooltip">
        <p className="label text-sm text-cyan">{`${label} : ${new Intl.NumberFormat(
          "en-IN",
          {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 5,
          }
        ).format(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
}
// We can also customize the tooltip by the Recharts Library

const ChartComponent = ({ data, currency, type }) => {
  return (
    <ResponsiveContainer height={"90%"}>
      <LineChart width={400} height={400} data={data}>
        <Line
          type="monotone"
          dataKey={type}
          stroke="#14ffec"
          strokeWidth={"1px"}
        />
        <CartesianGrid stroke="#323232" />
        <XAxis dataKey="date" hide />
        <YAxis dataKey={type} hide domain={["auto", "auto"]} />
        <Tooltip
          content={<CustomTooltip />}
          currency={currency}
          cursor={false}
          wrapperStyle={{ outline: "none" }}
        />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
    // This has been copied from the Recharts library and then updated with values
  );
};

// This CHART component deals with the Recharts library , having LineChart , XAXIS, YAXIS , Tooltip all copied from the Recharts library.

const Chart = ({ id }) => {
  const [chartData, setChartData] = useState();
  let { currency } = useContext(CryptoContext);
  const [type, setType] = useState("prices");
  const [days, setDays] = useState(7);

  useLayoutEffect(() => {
    const getChartData = async (id) => {
      try {
        const response = await fetch(
          // `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily` , API_OPTIONS
        )

        const data = await response.json();
          // .then((res) => res.json())
          // .then((json) => json);

        console.log("chart-data", data);

        let convertedData = data[type].map((item) => {
          return {
            date: new Date(item[0]).toLocaleDateString(),
            [type]: item[1],
          };
        });
        //The data received from the API call is converted into an "array of objects" in a specific format which we get from the Recharts library.
        // Timestamp is converted into a readable date

        // console.log(convertedData);
        setChartData(convertedData);
      } catch (error) {
        console.log(error);
      }
    };

    getChartData(id);
  }, [id, type, days]);

  return (
    <div className="w-full h-[60%]">
      <ChartComponent data={chartData} currency={currency} type={type} />
      <div className="flex">
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            type === "prices"
              ? "bg-cyan text-cyan"
              : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setType("prices")}
        >
          Price
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            type === "market_caps"
              ? "bg-cyan text-cyan"
              : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setType("market_caps")}
        >
          market caps
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            type === "total_volumes"
              ? "bg-cyan text-cyan"
              : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setType("total_volumes")}
        >
          total volumes
        </button>

        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            days === 7 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setDays(7)}
        >
          7d
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            days === 14 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setDays(14)}
        >
          14d
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            days === 30 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setDays(30)}
        >
          30d
        </button>
      </div>
    </div>
  );
};

export default Chart;



/* 
- Recharts library is used to show the chart 
- The data received from the API call is converted into an "array of objects" in a specific format which we get from the Recharts library.
-Once the data is converted, it will be in this format : {date:-- , prices:--},{date:-- , prices:--}
- This converted data is sent to the chart component
- Initially, in the chart component, do everything with only one type(prices)
data.prices.map(item=>{return{}});
And then Generalize this for all the values of the "data" variable which we got from the API.
- For this take a state variable ("type") , and then set the type whenever it is clicked.

*/