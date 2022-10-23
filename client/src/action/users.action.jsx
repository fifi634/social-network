import axios from 'axios';
import { fetchUrl } from '../config';

// Redux router
export const GET_USERS = "GET_USERS";



export const getUsers = () => {
    return (dispatch) => {
        return axios
            .get(fetchUrl + 'api/user', {withCredentials: true})
            .then((res) => dispatch({ type: GET_USERS, payload: res.data }))
            .catch((err) => console.log('Get users failed. ' + err))
        ;
    };
};
