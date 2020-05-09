import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './filter';


function App() {

  const [countries, setCountries] = useState([])
  const [filterValue, setFilterValue]= useState();

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data);
    })
  }, [])

  return (
    <>
    <Filter value={filterValue} setFilterValue={setFilterValue} countries={countries} setCountries={setCountries}/>
    </>
  )
}

export default App;
