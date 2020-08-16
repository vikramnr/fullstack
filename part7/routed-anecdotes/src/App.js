import React, { useState } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  useRouteMatch,
  useHistory
} from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link to="/anectodes" style={padding}>
        anecdotes
      </Link>
      <Link to="/create" style={padding}>
        create
      </Link>
      <Link to="/" style={padding}>
        about
      </Link>
    </div>
  )
}

const Anecdote = ({ anecdote }) => {
  return <>
    <h3>{anecdote.content}</h3>
    <div>has {anecdote.votes} votes</div>
  </>
}

const Notification = ({notification}) => {
  if(notification)
  return (
    <h4>{notification}</h4>
  )
  return(
    <></>
  )
}

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for{' '}
    <a href="https://courses.helsinki.fi/fi/tkt21009">
      Full Stack -websovelluskehitys
    </a>
    . See{' '}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
)

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2',
    },
  ])

  const [notification, setNotification] = useState('')
  const history = useHistory()

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const displayNotification = (message) => {
    setNotification(message)  
    setTimeout(() => {
      setNotification(null)
    }, 1000);
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  const match = useRouteMatch('/anecdote/:id')
  const anecdote = match ? anecdoteById(match.params.id) : null

  return (
    <div>
      <Notification notification={notification}/>
      <Menu />
      <Switch>
        <Route path="/anecdote/:id">
          <Anecdote anecdote={anecdote} />{'   '}
        </Route>
        <Route path="/anectodes">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route path="/create">
          <AnecdoteForm  addNew={addNew} history={history} displayNotification={displayNotification}/>
        </Route>
        <Route path="/">
          <About />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App
