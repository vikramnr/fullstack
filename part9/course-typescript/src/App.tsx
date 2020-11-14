import React from "react";
import Header from './components/Header'
import Content, { ContentProps } from './components/Content';
import Total from './components/Total';


const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts : ContentProps[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];
  const total =  courseParts.map(a => a.exerciseCount).reduce((a,r) => a+r,1)
  return (
    <div>
      <Header courseName={courseName}/>
      <Content {...courseParts}/>
      <Total total={total}/>
    </div>
  );
};

export default App
