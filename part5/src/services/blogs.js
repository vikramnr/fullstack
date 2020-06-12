import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null;

const setToken = (usertoken) => {
  token = `bearer ${usertoken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (post) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, post, config)
  return response.data
}

const update = async (post) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(baseUrl+'/'+post.id, post, config)
  return response.data
}

const remove = async (post) => {
  const config = {
    headers: { Authorization: token }
  }
  
  const response = await axios.delete(baseUrl+'/'+post.id, config)
  return response.data
}

export default { getAll, setToken, create, update, remove }