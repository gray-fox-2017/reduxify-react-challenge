import { NavigationActions } from 'react-navigation'
import { LOGIN } from './constant'

export const getLoginSuccess = user => {
    return {
        type: LOGIN,
        payload: user
    }
}

export const loginSuccess = user => {
    return dispatch => {
        dispatch(getLoginSuccess(user))
        const resetNavigator = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' })
            ],
            params: [
                user
            ]
        })
        dispatch(resetNavigator)
    }
}