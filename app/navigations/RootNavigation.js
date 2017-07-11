import { StackNavigator } from 'react-navigation'

import Login from '../screens/Login'
import Chat from '../screens/Chat'
import Home from '../screens/Home'
import DetailArticle from '../screens/DetailArticle'

const RootNavigation = StackNavigator({
    Unauthorized: { screen: Login },
    Home: { screen: Home },
    DetailArticle: { screen: DetailArticle },
    Authorized: { screen: Chat }
})

export default RootNavigation