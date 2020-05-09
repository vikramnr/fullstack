import React, { useState, useEffect } from 'react'
import Filter from './filter';
import DisplayContact from './displayContact';
import AddContact from './addContact';
import personService from './services/persons'
import './index.css'
import Notification from './notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('add your name')
  const [newNumber, setNewNumber] = useState('....')
  const [filterName, setFilterName] = useState('');
  const [notification, setNotification] = useState(null)
  
  useEffect(()=>{
    personService.getAll().then(perResponse =>{
      setPersons(perResponse)
    })
  },[])  
  
  return (

    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <Filter value={filterName} setFilterName={setFilterName}/>
      <h2>Add a new</h2>
      <AddContact newName={newName} persons={persons}
                  newNumber={newNumber} setNewName={setNewName}  
                  setNewNumber={setNewNumber} setPersons={setPersons} setNotification={setNotification}/>
      <h2>Numbers</h2>
      <DisplayContact persons={persons} filterName={filterName} setPersons={setPersons} setNotification={setNotification}/>
    </div>
  )
}

export default App