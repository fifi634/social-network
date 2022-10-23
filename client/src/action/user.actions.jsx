import axios from "axios";
import { fetchUrl } from "../config";


// Redux router 
export const GET_USER = 'GET_USER';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';
export const UPLOAD_DEFAULT_AVATAR = 'UPLOAD_DEFAULT_AVATAR';
export const UPDATE_USER_ERRORS = 'UPDATE_USER_ERRORS';



export const getUser = (uid) => {
    return (dispatch) => {  // Send axios response to Redux reducer (src/reducers/user.reducer.jsx)
        return axios
            .get(`${fetchUrl}api/user/${uid}`, {withCredentials: true})
            .then((res) => {
                dispatch({ type: GET_USER, payload: res.data })
            })
            .catch((err) => console.log('Get user failed. ' + err))
        ;
    };
};

