import { GET_USER } from "../action/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.playload            
        default:
            return state;
    }
};