import React from "react";
import personService from './services/persons'

const AddContact = ({ newName, setPersons, setNewName, setNewNumber, newNumber, persons,setNotification }) => {

    const onNameChange = (event) => setNewName(event.target.value);
    const onNumberChange = (event) => setNewNumber(event.target.value);

    const addContact = (event) => {
        event.preventDefault();
        let foundPerson = persons.find(i => i.name === newName);
        if (foundPerson) {
            if (window.confirm(`replace the number for ${foundPerson.name}`)) {
                foundPerson = { ...foundPerson, number: newNumber }
                personService.updatePerson(foundPerson, foundPerson.id).then(resPer => {
                    setPersons(persons.map(person => person.id !== foundPerson.id ? person : foundPerson));
                })
            }
        }
        else {
            const newPerson = {
                name: newName,
                number: newNumber,
                id: persons.length + 1
            }

            personService.create(newPerson).then(perResponse => {
                setPersons(persons.concat(perResponse));
                setNotification(`Added ${newPerson.name}`)
                setTimeout(() => {
                    setNotification(null);
                }, 1000);
            })
        }
        setNewName('')
        setNewNumber('')

    }

    return (
        <form onSubmit={addContact}>
            <div>
                name: <input value={newName} onChange={onNameChange} />

            </div>
            <div>number: <input value={newNumber} onChange={onNumberChange} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
};


export default AddContact