import { GET_USER_ERRORS } from "../action/post.action";

const initialState = { updateUserErrors: [], uploadFile: '' };



export default function errorReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_ERRORS:
            return {
                uploadFile: action.payload
            }
        default:
            return state
        ;
    };
};