import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'

const loginUser = async (cred) => {
  const response = await axios.post(baseUrl, cred)
  
  return response.data
}

export default { loginUser }