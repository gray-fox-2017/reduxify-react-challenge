//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class DetailArticle extends Component {
    render() {
        console.log('++++, ', this.props)

        const item = this.props.navigation.state.params.item
        return (
            <View style={styles.container}>
                <Text>sasasa</Text>
                <Text style={styles.textItem}>{item.title}</Text>
                <Text>{item.description}</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    textItem: {
        color: '#fff'
    }
});

//make this component available to the app
export default DetailArticle;
