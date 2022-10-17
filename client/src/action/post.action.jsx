import axios from 'axios';
import { fetchUrl } from '../config';

// Posts
export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";

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
            .catch((err) => console.log('Axios patch like failed. ' + err))
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
            .catch((err) => console.log('Axios patch unlike failed. ' + err))
        ;
    };
};