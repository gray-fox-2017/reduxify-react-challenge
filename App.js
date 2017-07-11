import React from 'react'

import {
    StyleSheet,
    AppRegistry,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'

import firebase from 'firebase'

import {
    LoginButton,
    AccessToken,
    LoginManager
} from 'react-native-fbsdk'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333', 
        marginBottom: 5,
    },
})

const config = {
    apiKey: "AIzaSyBFjgKkB0eHqGH2hZlkMpbyYmuYjW1Vl4Q",
    authDomain: "fir-login-b01b2.firebaseapp.com",
    databaseURL: "https://fir-login-b01b2.firebaseio.com",
    projectId: "fir-login-b01b2",
    storageBucket: "fir-login-b01b2.appspot.com",
    messagingSenderId: "57641490196"
};
firebase.initializeApp(config);

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            logged: false,
            animating: false
        }
    }

    handleLogin = () => {
        if (!this.state.logged) {
            LoginManager.logInWithPublishPermissions(['publish_actions'])
            .then(result => {
                if (result.isCancelled) {
                    alert('Cancel login')
                }

                this.setState({logged: true})
                AccessToken.getCurrentAccessToken().then(
                    data => {
                        alert(data.accessToken.toString())
                    }
                ).catch(error => alert(error))
            })
            .catch(error => console.log(error))
        } else {
            this.setState({ logged: false })
            LoginManager.logOut()
        }
    }

    onLogin = async () => {
        try {
            this.setState({
                animating: true
            })
            const result = await LoginManager.logInWithReadPermissions(['public_profile'])
            const tokenData = await AccessToken.getCurrentAccessToken()
            const token = tokenData.accessToken.toString()
            const credential = firebase.auth.FacebookAuthProvider.credential(token)
            const user = await firebase.auth().signInWithCredential(credential)
            firebase.database().ref(`/users/${user.uid}/profile`).set({
                name: user.displayName,
                email: user.email,
                avatar: user.photoUrl
            })
            this.setState({
                animating: false
            })
            // console.log(user)
        } catch(error) {
            this.setState({
                animating: false
            })
            console.log(error.message)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <ActivityIndicator
                    animating={this.state.animating}
                    color="#ddd"
                    size="large" 
                />
                <LoginButton
                    publishPermissions={["publish_actions"]}
                    onLoginFinished={
                        (error, result) => {
                        if (error) {
                            alert("login has error: " + result.error);
                        } else if (result.isCancelled) {
                            alert("login is cancelled.");
                        } else {
                            AccessToken.getCurrentAccessToken().then(
                            (data) => {
                                alert(data.accessToken.toString())
                            }
                            )
                        }
                        }
                    }
                    onLogoutFinished={() => alert("logout.")}
                />
                <TouchableOpacity
                    onPress={this.onLogin}
                    style={{
                        marginTop: 10,
                        padding: 10,
                        backgroundColor: 'green',
                        borderRadius: 5
                    }}>
                    <Text style={{color: '#fff'}}>
                        { this.state.logged ? 'Logout' : 'Login' }
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}

export default App