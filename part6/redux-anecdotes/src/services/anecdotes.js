import axios from 'axios'
const baseUrl = `http://localhost:3001/anecdotes`

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const anectode = { content, votes: 0 }
  const response = await axios.post(baseUrl, anectode)
  return response.data
}

const update = async (id) => {
  const anectode = await axios.get(baseUrl + `/${id}`)
  const updateAnectode = anectode.data
  const updatedAnectode = {
    ...updateAnectode,
    votes: (updateAnectode.votes += 1),
  }
  const response = await axios.put(baseUrl + `/${id}`, updatedAnectode)
  return response.data
}

export default {
  getAll,
  create,
  update,
}
