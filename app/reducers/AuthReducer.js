import { LOGIN } from '../actions/constant' 

const initialState = {
    loggedIn: false,
    user: null
}

const login = (state, data) => {
    let newState = {
        ...state,
        loggedIn: true,
        user: data
    }
    return newState
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case LOGIN:
            return login(state, payload)
        default:
            return state;
    }
}