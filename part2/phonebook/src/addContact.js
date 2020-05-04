import React from "react";

const AddContact = ({newName,setPersons,setNewName,setNewNumber,newNumber,persons}) => {
    
    const onNameChange = (event) => setNewName(event.target.value);
    const onNumberChange = (event) => setNewNumber(event.target.value);
    const addContact = (event) => {
        event.preventDefault();
        if (persons.findIndex(i => i.name === newName) !== -1) {
            return alert(`${newName} is already added to the phone book`);
        }
        const newPerson = {
            name: newName,
            number: newNumber
        }
        setPersons(persons.concat(newPerson))
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