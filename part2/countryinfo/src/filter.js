import React, { useState } from 'react';
import axios from 'axios'
import DisplayCountry from './displaycountry';

const Filter = ({ filterValue, setFilterValue, countries }) => {

    const [filtercountries, setFilterCountries] = useState([])

    const onChangeValue = (event) => {
        setFilterValue(event.target.value)
        let tmpCountries = countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase()))
        if (tmpCountries.length === 1) {
            axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${tmpCountries[0].capital}`).then(response1 => {
                let tmpWeather = response1.data;
                tmpCountries[0].weather = tmpWeather;
                setFilterCountries(tmpCountries);
            })
        } else {
            setFilterCountries(tmpCountries);
        }
    }

    return (
        <div>
            Enter a country to filter<input value={filterValue} onChange={onChangeValue}></input>
            <DisplayCountry countries={filtercountries} onShowCountry={onChangeValue}/>
        </div>
    )
}

export default Filter