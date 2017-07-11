import { NavigationActions } from 'react-navigation'

import { GET_DATA_SOURCES, GET_DATA_START } from './constant'

import axios from 'axios'

export const getDataStart = () => {
    return {
        type: GET_DATA_START
    }
}

export const getDataSources = data => {
    return {
        type: GET_DATA_SOURCES,
        payload: data
    }
}

export const getAllSources = () => {
    return dispatch => {
        dispatch(getDataStart())

        // NOTE: Get All Sources News
        axios.get(`https://newsapi.org/v1/sources?languange=en`)
        .then(response => {
            console.log('####: ', response.data)
            dispatch(getDataSources(response.data.sources))
        })
        .catch(error => {
            console.log(`opps, getAllSources error like this: ${error}`);
        })
    }
}