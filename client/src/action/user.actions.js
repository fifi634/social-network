import axios from "axios";
import { fetchUrl } from "../config";


// Redux 'router' (table of contents)
export const GET_USER = 'GET_USER';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';
export const UPLOAD_DEFAULT_AVATAR = 'UPLOAD_DEFAULT_AVATAR';

// Get userobject
export const getUser = (uid) => {
    return (dispatch) => {  // Send axios response to Redux reducer (src/reducers/user.reducer.jsx)
        return axios
            .get(`${fetchUrl}api/user/${uid}`, {withCredentials: true})
            .then((res) => {
                dispatch({ type: GET_USER, playload: res.data })
            })
            .catch((err) => console.log('Fetch Redux getUser failed. ' + err))
        ;
    }
};


// Upload File
export const uploadPicture = (data, userId) => {
    return async (dispatch) => {  
        return axios({
            method: 'post',
            url: fetchUrl + 'api/user/upload',
            data: data,
            withCredentials: true
        })
            .then (async (res) => {          
                // Get server file uploaded
                return await axios
                    .get(fetchUrl + `api/user/${userId}`, {withCredentials: true})
                    .then(res => {
                        // To upload picture slug in Redux store
                        dispatch({ type: UPLOAD_PICTURE, playload: res.data.avatar_slug});
                    })
                    .catch(err => console.log('Redux fetch get uploadPicture failed. ', err))
                ;
            })
            .catch(err => console.log('Redux fetch post uploadPicture failed. ', err))
        ;
    }
};


// Change avatar to default image
export const uploadDefaultAvatar = (avatarSlug) => {
    return(dispatch) => {
        return axios({
            method: 'patch',
            url: fetchUrl + 'api/user/',
            data: { avatar_slug: avatarSlug },
            withCredentials: true
        })
            .then(res =>  dispatch({ type: UPLOAD_DEFAULT_AVATAR, playload: avatarSlug }))
            .catch(err => console.log('Update default avatar failed. ' + err))
        ;
    }
};