import axios from "axios";
// import { passwordErrors } from "../../../api/utils/errors.utils";
import { fetchUrl } from "../config";


// Redux 'router' (table of contents)
export const GET_USER = 'GET_USER';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';
export const UPLOAD_DEFAULT_AVATAR = 'UPLOAD_DEFAULT_AVATAR';
export const UPDATE_USER_ERRORS = 'UPDATE_USER_ERRORS';



    /*************** */
    /* GET USER INFO */
    /*************** */

// Get userobject
export const getUser = (uid) => {
    return (dispatch) => {  // Send axios response to Redux reducer (src/reducers/user.reducer.jsx)
        return axios
            .get(`${fetchUrl}api/user/${uid}`, {withCredentials: true})
            .then((res) => {
                dispatch({ type: GET_USER, payload: res.data })
            })
            .catch((err) => console.log('Get user failed. ' + err))
        ;
    }
};



    /*************** */
    /* UPDATE PROFIL */
    /*************** */


// // Upload avatar file for update profil
// export const uploadPicture = (data, userId) => {
//     return (dispatch) => {  
//         return axios({
//             method: 'post',
//             url: fetchUrl + 'api/user/upload-profil',
//             data: data,
//             withCredentials: true,
//             headers: { "Content-Type": "multipart/form-data" }
//         })
//             .then ((res) => {          
//                 // Get server file uploaded
//                 return axios
//                     .get(fetchUrl + `api/user/${userId}`, {withCredentials: true})
//                     .then(res => {
//                         // To upload picture slug in Redux store
//                         dispatch({ type: UPLOAD_PICTURE, payload: res.data.avatar_slug});
//                     })
//                     .catch(err => console.log('Upload picture failed. ' + err))
//                 ;
//             })
//             .catch(err => console.log('Redux Axios post uploadPicture failed. ' + err))
//         ;
//     }
// };


// // Change avatar to default image for update profil
// export const uploadDefaultAvatar = (avatarSlug) => {
//     return(dispatch) => {
//         return axios({
//             method: 'patch',
//             url: fetchUrl + 'api/user/',
//             data: { avatar_slug: avatarSlug },
//             withCredentials: true
//         })
//             .then(res =>  dispatch({ type: UPLOAD_DEFAULT_AVATAR, payload: avatarSlug }))
//             .catch(err => console.log('Update default avatar failed. ' + err))
//         ;
//     }
// };


// Update user info for update profil
export const updateProfil = (inputEmail, inputPassword, inputPseudo, avatarSlug, uid) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${fetchUrl}api/user/`,
            withCredentials: true,
            data: {
                email: inputEmail,
                password: inputPassword,
                pseudo: inputPseudo,
                avatar_slug: avatarSlug
            }
        })
            .then((res) => {   
                return axios
                    .get(`${fetchUrl}api/user/${uid}`, {withCredentials: true})
                    .then((res) => {
                        // Signup errors 
                        if (res.data.errors) {
                            dispatch({ type: UPDATE_USER_ERRORS, payload: res.data.errors })
                        } 
                        dispatch({ type: GET_USER, payload: res.data });
                    })
                    .catch((err) => console.log('Get user failed. ' + err))
                ;         
            })
            .catch(err => {
                console.log('Update user info failed. ' + err);
            })
        ;
    }
};

    /*************** */



//     /************* */
//     /* CREATE USER */
//     /************* */

// // Upload avatar file for new user
// export const createProfil = (data) => {
//     return axios({
//         method: 'post',
//         url: fetchUrl + 'api/user/signup',
//         data: data,
//         withCredentials: true
//     })
//         // .then (async (res) => {          
//         //     if (res.data.errors) return res.data.errors;
//         // })
//         // .catch(err => console.log('Fetch post createPicture failed. ', err))
//     ;
// };
