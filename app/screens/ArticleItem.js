import React from 'react'

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native'

class ArticleItem extends React.Component {

    render() {
        const { item, index, source } = this.props
        const { navigate } = this.props.navigator;
        return (
            <View>
                <TouchableOpacity onPress={() => navigate('DetailArticle', {item})}>
                    <Text>{item.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default ArticleItem