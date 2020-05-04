import React from "react";

const DisplayContact = ({persons,filterName}) => {
    const filterPerson =filterName.length>0 ? persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())) : persons;
    return(
    <>
      {filterPerson.map(person => <div key={person.name}>
        {person.name} {person.number}
      </div>
      )}
     </> 
    )
};


export default DisplayContact