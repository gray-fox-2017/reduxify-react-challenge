import React from 'react'
import { Provider } from 'react-redux'

import {
    View,
    Text,
} from 'react-native'

import AppNavigator from './AppNavigator'

import store from './store'

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        )
    }
}

export default App