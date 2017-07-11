import React from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'

import Autocomplete from 'react-native-autocomplete-input';

import { connect } from 'react-redux'

import { getAllSources } from '../actions/SourceNews.js'

import { getAllNews } from '../actions/ArticleNews'

import ArticleItem from './ArticleItem'

class Home extends React.Component {
    static navigationOptions = {
        title: 'Home'
    }

    static renderSource(source) {
        const { name } = source;

        return (
        <View>
            <Text style={styles.titleText}>{name}</Text>
        </View>
        );
    }

    constructor(props) {
        super(props)
        this.state = {
            query: ''
        }
    }

    findSource(query) {
        if (query === '') {
            return []
        }

        var regexp = new RegExp(`${query.trim()}`, 'gi')
    
        return this.props.sourceList.filter(source => {
            return source.name.search(regexp) >= 0
        })
    }

    renderOnChange(text) {
        this.setState({
            query: text 
        })

        var regexp = new RegExp(`${text.trim()}`, 'gi')

        let dataTemp = this.props.sourceList.filter(source => {
            return source.id.search(regexp) >= 0
        })
        console.log('%%%%: ', dataTemp[0].id)
        this.props.getArticleNews(dataTemp[0].id)
        
    }

    renderLoading() {
        return (
            <Text>
                Loading.....
            </Text>
        )
    }

    renderNewsItem() {
        if (this.props.newsList) {
            const component = []
            this.props.newsList.map((item, index) => {
                component.push(
                    <ArticleItem item={item} key={index} index={index} source={this.props.sourceText} navigator={this.props.navigation}/>
                )
            })
            return component
        } else {
            return (
                <View>
                    <Text>Choose the source</Text>
                </View>
            )
        }
    }

    changeQuery(name) {
        this.setState({ 
            query: name 
        })
    }

    renderSelectSource () {
        const { query } = this.state
        const sources = this.findSource(query)
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

        return (
            <Autocomplete
                autoCapitalize="none"
                autoCorrect={false}
                containerStyle={styles.autocompleteContainer}
                data={sources.length === 1 && comp(query, sources[0].name) ? [] : sources}
                defaultValue={query}
                onChangeText={(text) => this.renderOnChange(text)}
                placeholder="Enter source the news"
                renderItem={({name}) => (
                    <TouchableOpacity onPress={() => this.changeQuery(name)}>
                        <Text style={styles.itemText}>
                            {name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        )
    }

    renderListNews() {
        return (
            <View>
                <View>
                    {this.renderSelectSource()}
                </View>
                <View>
                    {this.renderNewsItem()}
                </View>
            </View>
        )
    }

    componentDidMount() {
        this.props.getSources()
    }

    render() {
        // return (
        //     <View>
        //         {(this.props.loadingSource) ? return (
        //         this.renderLoading()
        //     )}  
        //     </View>
        // )
        if (this.props.loadingSource) {
            return (
                this.renderLoading()
            )
        } else {
            return (
                this.renderListNews()
            )
        }
    }
}

const mapStateToProps = state => {
    console.log('***: ', state.news.newsList)
    return {
        sourceList: state.sources.sourceList,
        loadingSource: state.sources.loading,
        newsList: state.news.newsList.articles,
        sourceText: state.news.newsList.source,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSources: () => {
            dispatch(getAllSources())
        },
        getArticleNews: (source) => {
            dispatch(getAllNews(source))
        }
    }
}

const styles = StyleSheet.create({
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    },
    itemText: {
        fontSize: 15,
        margin: 2
    },
    descriptionContainer: {
        backgroundColor: '#F5FCFF',
        marginTop: 25
    },
    titleText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
    },
    infoText: {
        textAlign: 'center'
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)