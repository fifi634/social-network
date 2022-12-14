import axios from 'axios';
import { fetchUrl } from '../config';

// Reduc router
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const GET_USER_ERRORS = "GET_USER_ERRORS";


export const addPost = (data) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: fetchUrl + 'api/post/', 
            withCredentials: true,
            headers: { 'Content-Type':'multipart/form-data' },
            data: data
    })
        .then(() => {               
            dispatch({ type: GET_USER_ERRORS, payload: '' });       
        })
        .catch((err) => {
            dispatch({ type: GET_USER_ERRORS, payload: JSON.stringify(err) })
            console.log('Send addPost failed. ' + err);
        });
        ;
    };
}


export const getPosts = () => {
    return (dispatch) => {
        return axios 
            .get(fetchUrl + 'api/post/', { withCredentials: true })
            .then((res) => {
                dispatch({ type: GET_POSTS, payload: res.data });
            })
            .catch((err) => console.log('Get posts failed. ' + err))
        ;
    }
};


export const likePost = (postId, userId) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${fetchUrl}api/post/like/${postId}`,            
            data: { likerId: userId },
            withCredentials: true           
        })
            .then(() => {
                dispatch({ type: LIKE_POST, payload: {postId, userId} });
            })
            .catch((err) => console.log('Send like failed. ' + err))
        ;
    };
};


export const unlikePost = (postId, userId) => {
    return (dispatch) => {
        return axios ({
            method: 'patch',
            url: fetchUrl + 'api/post/unlike/' + postId,
            data: { likerId: userId },
            withCredentials: true
        })
            .then((res) => {
                dispatch({ type: UNLIKE_POST, payload: {postId, userId} })
            })
            .catch((err) => console.log('Send unlike failed. ' + err))
        ;
    };
};


export const updatePost = (postId, message) => {
    return(dispatch) => {
        return axios({
            method: 'patch',
            url: fetchUrl + 'api/post/' + postId,
            data: { message },
            withCredentials: true
        })
            .then((res) => {
                dispatch({ type: UPDATE_POST, payload: { message, postId }});
            })
            .catch((err) => console.log('Update post failed. ' + err))
        ;
    };
};


export const deletePost = (postId) => {
    return(dispatch) => {
        return axios ({
            method: 'delete',
            url: fetchUrl + 'api/post/' + postId,
            withCredentials: true
        })
            .then((res) => {
                dispatch({ type: DELETE_POST, payload: { postId }});
            })
            .catch((err) => console.log('Axios delete post failed. ' + err))
        ;
    };
};