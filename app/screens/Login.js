import React from 'react'

import { connect } from 'react-redux'

import { loginSuccess } from '../actions/Authenticate'

import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'

import firebase from 'firebase'

import {
    LoginButton,
    AccessToken,
    LoginManager
} from 'react-native-fbsdk'

const config = {
    apiKey: "AIzaSyBFjgKkB0eHqGH2hZlkMpbyYmuYjW1Vl4Q",
    authDomain: "fir-login-b01b2.firebaseapp.com",
    databaseURL: "https://fir-login-b01b2.firebaseio.com",
    projectId: "fir-login-b01b2",
    storageBucket: "fir-login-b01b2.appspot.com",
    messagingSenderId: "57641490196"
};
firebase.initializeApp(config);

class Login extends React.Component {

    static navigationOptions = {
        title: 'Login'
    }

    constructor() {
        super()
        this.state = ({
            animating: true,
            token: ''
        })
    }

    componentDidMount() {
        console.log('componentDidMount', this.props)
    }

    onLogin = async () => {
        try {
            this.setState({
                animating: true
            })

            const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email'])
            const tokenData = await AccessToken.getCurrentAccessToken()
            const token = tokenData.accessToken.toString()
            const credential = firebase.auth.FacebookAuthProvider.credential(token)
            const user = await firebase.auth().signInWithCredential(credential)
            
            // firebase.database().ref(`/users/${user.uid}/profile`).set({
            //     name: user.displayName,
            //     avatar: user.photoUrl
            // })
            console.log('user ^^^^: ', user)
            this.setState({
                animating: false
            })
            this.props.loginSuccess(user)
        } catch(error) {
            this.setState({
                animating: false
            })
            console.log(error)
        }
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20, color: 'red'}}>Login Screen</Text>
                <ActivityIndicator
                    animating={this.state.animating}
                    color="#ddd"
                    size="large" 
                />
                <TouchableOpacity
                    onPress={this.onLogin}
                    style={{
                        marginTop: 10,
                        padding: 10,
                        backgroundColor: '#3b5998',
                        borderRadius: 5
                    }}>
                    <Text style={{color: '#fff'}}>
                        Login with Facebook
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps ***** : ', state)
    console.log('mapStateToProps Auth: ', state.auth)
    console.log('mapStateToProps Nav: ', state.nav)
    return {
        logged: state.auth.loggedIn,
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginSuccess: (user) => {
            dispatch(loginSuccess(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)