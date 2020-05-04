import React from "react";

const Filter = ({filterName,setFilterName}) => {
    const onFilterChange = (event) => setFilterName(event.target.value);
    return (
        <>
        fitler with name
        <input value={filterName} onChange={onFilterChange} />
        </>)
};


export default Filter