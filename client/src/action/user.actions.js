import axios from "axios";
import { fetchUrl } from "../config";


// Redux 'router' (table of contents)
export const GET_USER = 'GET_USER';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';
export const UPLOAD_DEFAULT_AVATAR = 'UPLOAD_DEFAULT_AVATAR';
// export const UPDATE_PROFIL = 'UPDATE_PROFIL';


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
    console.log('dispatch picture');
    return (dispatch) => {  
        return axios({
            method: 'post',
            url: fetchUrl + 'api/user/upload',
            data: data,
            withCredentials: true
        })
            .then (async (res) => {          
                // Get server file uploaded
                return axios
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
    console.log('dispatch avatar');
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


// Update user info
export const updateProfil = (inputEmail, inputPassword, inputPseudo, uid) => {
    console.log('dispatch profil');
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${fetchUrl}api/user/`,
            withCredentials: true,
            data: {
                email: inputEmail,
                password: inputPassword,
                pseudo: inputPseudo,
            }
        })
            .then((res) => {   
                console.log(res.data.message);
                return axios
                    .get(`${fetchUrl}api/user/${uid}`, {withCredentials: true})
                    .then((res) => {
                        dispatch({ type: GET_USER, playload: res.data });
                    })
                    .catch((err) => console.log('Fetch Redux getUser failed. ' + err))


                // // Sgnup errors 
                // if (res.data.errors) return res.data.errors;
         
            })
            .catch(err => {
                console.log('Update user info failed. ', err);
            })
        ;            
    }
}