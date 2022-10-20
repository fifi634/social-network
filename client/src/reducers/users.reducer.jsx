import { DELETE_USER, GET_USERS } from "../action/users.action";

const initialState = {};

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return action.payload
        ;
        case DELETE_USER:
            return state.filter((users) => users._id !== action.payload.userId)
        default:
            return state
        ;
    };
};