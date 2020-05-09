import React from "react";
import personService from './services/persons'

const DisplayContact = ({ persons, filterName, setPersons,setNotification }) => {

  const filterPerson = filterName.length > 0 ? persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())) : persons;

  const onDeletePerson = (toBeDeletePerson) => {
    if (window.confirm(`Are you sure you want to delete ${toBeDeletePerson.name}`)) {
      personService.deletePerson(toBeDeletePerson.id).then(res => {
        setPersons(persons.filter(person => person.id !== toBeDeletePerson.id));
      }).catch(err =>{
        setNotification(`Information for ${toBeDeletePerson.name} has already been removed from the server`)
        setTimeout(() => {
          setNotification(null);
        }, 1000);
      });
    }
  }

  return (
    <>
      {filterPerson.map(person => <div className="note" key={person.id}>
        {person.name} {person.number}
        <button onClick={() => onDeletePerson(person)}>delete</button>
      </div>
      )}
    </>
  )
};


export default DisplayContact