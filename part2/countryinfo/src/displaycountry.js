import React from 'react';

const DisplayCountry = ({ countries,onShowCountry }) => {
    const onShowMore = (event) => {
        onShowCountry(event)
    }
    if (countries.length > 10) {
        return (<div>specify another filter</div>)
    }
    else if (countries.length === 1) {
        return (
            <div>
                <h1>{countries[0].name}</h1>
                <div>capital {countries[0].capital}</div>
                <div>population{countries[0].population}</div>
                <h4>languages</h4>
                <ul>
                    {countries[0].languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
                </ul>
                <img style={{ width: 20 + 'em' }} src={countries[0].flag} alt="country-flag" />
                <h3>Weather in {countries[0].capital}</h3>
                <div>
                    <div>
                        <strong>temparature:</strong> {countries[0].weather.current.temperature}
                    </div>
                    <div>
                        <img alt='weather pic' src={countries[0].weather.current.weather_icons[0]}></img>
                    </div>
                    <div>
                        <strong>wind:</strong> {countries[0].weather.current.wind_degree}{countries[0].weather.current.wind_dir}{countries[0].weather.current.wind_speed}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <ul>
            {countries.map(country => <li key={country.name}>{country.name} <button value={country.name} onClick={onShowMore}>show more</button> </li>)}
        </ul>
    )
}

export default DisplayCountry