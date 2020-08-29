import loginService from '../services/login'
import blogService  from '../services/blogs'

const userReducer = (state={},action) => {
    console.log(action.data,'user-data')
    switch (action.type) {
        case 'SET_USER':
            return action.data
        case 'INIT_USER':
            return action.data
        case 'REMOVE_USER':
            return action.data
        default:
            return state
    }
}

export const loginUser = (username, password) => {
    return async (dispatch) => {
        const logedUser = await loginService.loginUser({username,password})
        console.log(logedUser)
        blogService.setToken(logedUser.token)
        window.localStorage.setItem('blog-user', JSON.stringify(logedUser))
        dispatch({
            type:'SET_USER',
            data: logedUser
        })
    }
}

export const checkUser = () => {
    const userJSON = window.localStorage.getItem('blog-user')
    if (userJSON) {
      const loggedUser = JSON.parse(userJSON)
      blogService.setToken(loggedUser.token)
      console.log(loggedUser)
      return {
        type: 'INIT_USER',
        data: loggedUser
        }
    }
    return {
        type: 'INIT_USER',
        data:{}
    }    
}

export const logoutUser = () => {
    window.localStorage.removeItem('blog-user')
    return {
        type: 'REMOVE_USER',
        data: {}
    }
}


export default userReducer