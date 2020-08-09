const filter = null

const filterReducer = (state = filter, action) => {
  switch(action.type) {
    case  'SET_FILTER':
      return Object.assign(action.data)
    case 'REMOVER_FILTER':
      return null
    default:
      return state
  }
}

export const setFilter = (filterValue) => {
  return {
    type: 'SET_FILTER',
    data: filterValue
  }
}

export const removeFilter = () => {
  return {
    type: 'REMOVE_FILTER',
  }
}

export default filterReducer