// import { UPDATE_USER_ERRORS } from "../action/user.actions";
import { GET_USER_ERRORS } from "../action/post.action";

const initialState = { updateUserErrors: [], uploadFile: [] };



export default function errorReducer(state = initialState, action) {
    switch (action.type) {
        // case UPDATE_USER_ERRORS:
        //     return {
        //         updateUserErrors : action.payload,
        //         // uploadFile: []
        //     }
        // ;
        case GET_USER_ERRORS:
            return {
                uploadFile: action.payload,
                // updateUserErrors: []
            }
        default:
            return state
        ;
    };
};