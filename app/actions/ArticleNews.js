import { NavigationActions } from 'react-navigation'

import { GET_DATA_NEWS } from './constant'

import axios from 'axios'

export const getDataNews = data => {
    return {
        type: GET_DATA_NEWS,
        payload: data
    }
}

export const getAllNews = source => {
    return dispatch => {
        // NOTE: List News Article Based on Source News
        console.log('((()): ', source)
        axios.get(`https://newsapi.org/v1/articles?source=${source}&apiKey=8b8441d3403c4f73896ea3b0e039595b`)
        .then(response => {
            console.log('???: ', response.data)
            dispatch(getDataNews(response.data))
        })
        .catch(error => {
            console.log(`opps, getAllNews error like this: ${error}`);
        })
    }
}