const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_VOTES':
      let id = action.data.id
      let toupdateQuote = state.filter(quote => quote.id === id)[0]
      let updatedQuote = {
        ...toupdateQuote,
        votes : toupdateQuote.votes+=1
      }
      let updatedState = state.filter(quote => quote.id !== id)
      return [...updatedState,updatedQuote]
    case  'ADD_QUOTE':
      return [...state,action.data]   
    default:
      return state
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'ADD_QUOTE',
    data: {
      content,
      votes: 0,
      id: getId()
    }
  }
}

export const updateVotes = (id) => {
  return {
    type: 'ADD_VOTES',
    data: {
      id
    }
  }
}

export default reducer