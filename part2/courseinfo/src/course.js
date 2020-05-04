import React from "react";
import Header from './header'

const Course = ({course} ) => {
    return (
        <>
        <Header courseHeading={course.name}/>
        {course.parts.map(details=> <div key={details.id}>{details.name} {details.exercises}</div>)}
        <strong>total of {course.parts.reduce((a,c)=> a+c.exercises,0)} exercises.</strong>
        </>
    )
};


export default Course