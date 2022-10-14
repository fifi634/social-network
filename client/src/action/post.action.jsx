import axios from 'axios';
import { fetchUrl } from '../config';

// Posts
export const GET_POSTS = "GET_POSTS";

export const getPosts = () => {
    return (dispatch) => {
        return axios 
            .get(fetchUrl + 'api/post/', { withCredentials: true })
            .then((res) => {
                dispatch({ type: GET_POSTS, payload: res.data })
            })
            .catch((err) => console.log('Get posts failed. ', err))
        ;
    }
}