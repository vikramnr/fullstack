import React, { useState } from 'react'
import Filter from './filter';
import DisplayContact from './displayContact';
import AddContact from './addContact';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('add your name')
  const [newNumber, setNewNumber] = useState('....')
  const [filterName, setFilterName] = useState('');
  
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