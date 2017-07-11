import React from 'react'

import {
    View,
    Text,
} from 'react-native'

class Chat extends React.Component {
    static navigationOptions = {
        title: 'Chat'
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20, color: 'green'}}>Chat Screen</Text>
            </View>
        )
    }
}

export default Chat