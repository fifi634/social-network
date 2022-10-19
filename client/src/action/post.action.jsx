import axios from 'axios';
import { fetchUrl } from '../config';

// Posts
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const UPLOAD_POST = "UPLOAD_POST";
export const DELETE_POST = "DELETE_POST";

// // Get posts with infinity scroll
// export const getPosts = (countDisplay) => {
//     return (dispatch) => {
//         return axios 
//             .get(fetchUrl + 'api/post/', { withCredentials: true })
//             .then((res) => {
//                 const displayPost = res.data.slice(0, countDisplay);
//                 dispatch({ type: GET_POSTS, payload: displayPost });
//             })
//             .catch((err) => console.log('Get posts failed. ' + err))
//         ;
//     }
// };

export const addPost = (data) => {
    return (dispatch) => {
        return axios({
            method: 'post',
            url: fetchUrl + 'api/post/', 
            withCredentials: true,
            data: data
    })
        .then(() => {})
        .catch((err) => {
            console.log('Send addPost failed. ' + err);
        });
        ;
    };
}

// Getposts since inifinity scroll
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
            data: { likersId: userId },
            withCredentials: true           
        })
            .then((res) => {
                dispatch({ type: LIKE_POST, payload: {postId, userId} })
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
            data: { likersId: userId },
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

export const uploadPost = (postId, data) => {
    return(dispatch) => {
        return axios({
            method: 'post',
            url: fetchUrl + 'api/post/upload' + postId,
            data: data,
            withCredentials: true
        })
            .then((res) => {})
            .catch((err) => console.log('Send update post with picture failed. ' + err))
        ;
    }
}

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