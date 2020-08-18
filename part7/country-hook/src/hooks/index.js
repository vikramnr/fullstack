import useEffect from 'react'
import axios from 'axios'


export const useCountryEffect = (name,effect) => {
    useEffect(() => {
        async function fetchData() {
            return await axios.get(`https://restcountries.eu/rest/v2/name/${name}`)
        }
        fetchData()
        
    },effect)
}

