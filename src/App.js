import { useEffect, useState } from "react";
import React from "react";
import Axios from "axios";
import Dropdown from "react-dropdown";
import { HiSwitchHorizontal } from "react-icons/hi";
import "react-dropdown/style.css";
import "./App.css";

function App() {
  const [input, setInput] = useState([]);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [info, setInfo] = useState([]);
  const [options, setOptions] = useState("");
  const [output, setOutput] = useState(0);

  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`;
  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const res = await Axios.get(url);
        setInfo(res.data[from]);
        console.log(res);
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    };
    fetchCurrency();
  }, [from]);

  useEffect(() => {
    setOptions(Object.keys(info));
  }, [info]);

  const convert = () => {
    var convertedAmt = input * info[to];
    setOutput(convertedAmt);
  };

  return (
    <div className="App">
      <div className="heading">
        <h1>Currency converter</h1>
      </div>
      <div className="container">
        <div className="left">
          <label htmlFor="number">Amount:</label>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              // console.log(e.target.value);
            }}
            placeholder="Enter the amount"
          ></input>
        </div>
      </div>
      <div className="middle">
        <h3>From</h3>
        <Dropdown
          options={options}
          onChange={(e) => {
            setFrom(e.value);
            // console.log(e.value);
          }}
          placeholder="From"
        />
      </div>

      <div className="switch">
        <HiSwitchHorizontal size="30px" />
      </div>

      <div className="right">
        <h3>To</h3>
        <Dropdown
          options={options}
          onChange={(e) => {
            setTo(e.value);
            // console.log(e.value);
          }}
          placeholder="To"
        />
      </div>

      <div className="result">
        <button
          onClick={() => {
            convert();
          }}
        >
          Convert
        </button>
        <h3>Converted Amount:</h3>
        <p>{input + " " + from + " = " + output.toFixed(2) + " " + to}</p>
      </div>
    </div>
  );
}

export default App;
