import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}
const Statistics = ({ good, bad, neutral,score }) => {

  if(good <= 0 && bad <= 0 && neutral <=0) {
    return(
      <div>No feedback given so far...</div>
    )
  }

  return (<>
    <h4>stats</h4>
    <table>
    <tbody>
    <Statistic text={'good'} value={good}/>
    <Statistic text={'Bad'} value={bad}/>
    <Statistic text={'Neutral'} value={neutral}/>
    <Statistic text={'All'} value={good + bad + neutral}/>
    <Statistic text={'Average'} value={(score)/(good+bad+neutral)}/>
    <Statistic text={'Postive Feedback'} value={(good)/(good+bad+neutral)}/>
    </tbody>
    </table>
  </>)
}

const Statistic = ({text,value}) =>{
  return(
    <tr>
    <td>{text}</td>
    <td>{value}</td>
    </tr>
  )
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [score, setAll] = useState(0)


  const onGoodClick = () => {
    setGood(good + 1);
    setAll(score + 1);
  }
  
  const onNeutralClick = () => setNeutral(neutral + 1);
  
  const onBadClick = () => {
    setAll(score - 1);
    setBad(bad + 1);
  }

  return (
    <div>
      <h4>give feedback</h4>
      <Button text='good' onClick={onGoodClick} />
      <Button text='neutral' onClick={onNeutralClick} />
      <Button text='bad' onClick={onBadClick} />
      <Statistics good={good} bad={bad} neutral={neutral} score={score}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
