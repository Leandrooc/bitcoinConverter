import React, { useState, useEffect } from "react";
import "./Currency.css"

export function Currency() {
  const [rates, setRates] = useState([]);
  const [filter, setFilter] = useState('');
  const [currency, setCurrency] = useState('BTC')
  const [quantity, setQuantity] = useState(1);

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

  function ConversionToBTC() {
    const findValue = rates.find(({ unit }) => unit === currency );
    if (findValue) return (quantity / findValue.value).toFixed(8);
    return 1;
  }

  return (
    <>
      <div className="search">
        <h1>Search</h1>
        <input onChange={ ({ target: { value } }) => setFilter(value.toLowerCase()) } />
      </div>
      <main>
        <div className="childrenMain">
          <h5>Quantity:</h5>
          <input value={ quantity } onChange={ ({ target: { value }}) => setQuantity(value) } />
        </div>
        <div className="childrenMain">
          <h5>Currency:</h5>
        <select onChange={ ({ target: { value } }) => setCurrency(value)}>
          {
            rates.map(({ unit, name }) => (
              <option value={ unit } key={ name }>{ name }</option>
            ))
          }
        </select>
        </div>
        <div className="childrenMain">
          <h5>Conversion to BTC:</h5>
          <p>{ quantity } { currency } is equal to { ConversionToBTC() } BTC</p>
        </div>
      </main>
      <div className="table-wrapper">
      <table className="fl-table">
        <caption><h2>Conversion table</h2></caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Unity</th>
            <th>Currency</th>
            <th>Conversion to 1 BTC</th>
          </tr>
        </thead>
          <tbody>
        {
          rates
          .filter(({ name, unit, type }) => {
            const nameFilter = name.toLowerCase().includes(filter)
            const unityFilter = unit.toLowerCase().includes(filter)
            const typeFilter = type.toLowerCase().includes(filter)
            return nameFilter || unityFilter || typeFilter;
          })
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