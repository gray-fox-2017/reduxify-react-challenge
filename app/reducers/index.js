import { combineReducers } from 'redux'

import AuthReducer from './AuthReducer'
import NavigationReducer from './NavigationReducer'
import SourceReducers from './SourceReducer'
import ArticleReducers from './ArticleReducer'

export default combineReducers({
    auth: AuthReducer,
    nav: NavigationReducer,
    sources: SourceReducers,
    news: ArticleReducers
})