import React, { useState, useEffect } from 'react'
import Filter from './filter';
import DisplayContact from './displayContact';
import AddContact from './addContact';
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('add your name')
  const [newNumber, setNewNumber] = useState('....')
  const [filterName, setFilterName] = useState('');
  
  useEffect(()=>{
    axios.get('http://localhost:3001/persons').then(response =>{
      setPersons(response.data)
    })
  },[])  
  
  return (

    <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} setFilterName={setFilterName}/>
      <h2>Add a new</h2>
      <AddContact newName={newName} persons={persons}
                  newNumber={newNumber} setNewName={setNewName}  
                  setNewNumber={setNewNumber} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <DisplayContact persons={persons} filterName={filterName}/>
    </div>
  )
}

export default App