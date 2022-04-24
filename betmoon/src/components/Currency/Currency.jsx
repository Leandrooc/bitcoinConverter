import React, { useState, useEffect } from "react";
import "./Currency.css"

export function Currency() {
  const [rates, setRates] = useState([]);
  const [filter, setFilter] = useState('');
  const [currency, setCurrency] = useState('BTC')
  const [quantity, setQuantity] = useState(0);

  const fetchAPI = async () => {
    try {
      const URL = 'https://api.coingecko.com/api/v3/exchange_rates'
      const { rates } = await (await fetch(URL)).json();
      setRates(Object.values(rates))
    } catch(error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  console.log(rates);
  function ConversionToBTC() {
    const { value } = rates.find(({ unit }) => unit === currency );
    return quantity / value;
  }

  return (
    <>
      <div className="search">
        <h1>Search</h1>
        <input onChange={ ({ target: { value } }) => setFilter(value.toLowerCase()) } />
      </div>
      <main>
        <div>
          <h5>Quantity:</h5>
          <input value={ quantity } onChange={ ({ target: { value }}) => setQuantity(value) } />
        </div>
        <div>
          <h5>Currency:</h5>
        <select onChange={ ({ target: { value } }) => setCurrency(value)}>
          {
            rates.map(({ unit, name }) => (
              <option value={ unit } key={ name }>{ name }</option>
            ))
          }
        </select>
        </div>
        <div>
          <h5>Conversion to BTC:</h5>
          <p>{ quantity } { currency } is equal to { ConversionToBTC() } BTC</p>
        </div>
      </main>
      <div className="rates">
      <table border="1">
        <caption>Currency's</caption>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Unity</th>
            <th>Type</th>
            <th>Value</th>
          </tr>
        {
          rates
          .filter(({ name }) => name.toLowerCase().includes(filter))
          .map(({ name, type, unit, value}) => (
            <tr className="itemRates" key={ name }>
              <td>{ name }</td>
              <td>{ type }</td>
              <td>{ unit }</td>
              <td>{ value }</td>
              <br/>
            </tr>
          ))
        }
        </tbody>
      </table>
        </div>
    </>
  )
}