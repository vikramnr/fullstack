import userService from '../services/users'

const userReducer = (state=[],action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return action.data
        default:
            return state
    }
}

export const userData = () => {
    return async (dispatch) => {
        const userStats = await userService.getAll()
        dispatch({
            type:'SET_USER_DATA',
            data: userStats
        })
    }
}

export default userReducer