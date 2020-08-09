import anectodeService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_VOTES':
      let id = action.data.id
      let toupdateQuote = state.filter((quote) => quote.id === id)[0]
      let updatedQuote = {
        ...toupdateQuote,
        votes: (toupdateQuote.votes += 1),
      }
      let updatedState = state.filter((quote) => quote.id !== id)
      return [...updatedState, updatedQuote]
    case 'ADD_QUOTE':
      return [...state, action.data]
    case 'INIT_QUOTES':
      return action.data
    default:
      return state
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anectodeService.create(content)
    dispatch({ type: 'ADD_QUOTE', data: newAnecdote })
  }
}

export const initializeQuotes = () => {
  return async (dispatch) => {
    const anectodes = await anectodeService.getAll()
    dispatch({
      type: 'INIT_QUOTES',
      data: anectodes,
    })
  }
}

export const updateVotes = (id) => {
  return async (dispatch) => {
    const anectode = await anectodeService.update(id)
    console.log(anectode)
    dispatch({
      type: 'ADD_VOTES',
      data: {
        id,
      },
    })
  }
}

export default anecdoteReducer
