import axios from "axios";
import { fetchUrl } from "../config";

export const GET_USER = 'GET_USER';

export const getUser = (uid) => {
    return (dispatch) => {
        return axios
            .get(`${fetchUrl}api/user/${uid}`, {withCredentials: true})
            .then((res) => {
                dispatch({ type: GET_USER, playload: res.data })
            })
            .catch((err) => console.log('Fetch Redux getUser failed. ' + err))
        ;
    }
}