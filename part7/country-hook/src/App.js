import React, { useState, useEffect } from 'react'
import axios from 'axios'

// function FriendStatus(props) {
//   const [isOnline, setIsOnline] = useState(null)
//   useEffect(() => {
//     function handleStatusChange(status) {
//       setIsOnline(status.isOnline)
//     }
//     ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange)
//     return () => {
//       ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange)
//     }
//   })
// }
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
    async function getCountry() {
      const response = await axios(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      return response.data
    }
    getCountry().then(c => {
      let updatedCountry = {
        found: true,
        data: c[0]
      }
      setCountry(updatedCountry)
    }).catch(er => console.log(er))
  },[name])
  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)
  
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
