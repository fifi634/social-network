import axios from 'axios';
import { fetchUrl } from '../config';

export const GET_USERS = "GET_USERS";
// export const DELETE_USER = "DELETE_USER";

export const getUsers = () => {
    return (dispatch) => {
        return axios
            .get(fetchUrl + 'api/user', {withCredentials: true})
            .then((res) => dispatch({ type: GET_USERS, payload: res.data }))
            .catch((err) => console.log('Get users failed. ' + err))
        ;
    };
};

// export const deleteUser = (userId) => {
//     return(dispatch) => {
//         return axios.delete(fetchUrl + 'api/user/', {withCredentials: true})
//             .then((res) => dispatch({ type: DELETE_USER, payload: { userId } }))
//             .catch((err) => console.log('Axios delete user failed. ' + err))
//         ;
//     };
// };