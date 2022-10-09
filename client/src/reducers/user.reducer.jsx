import { GET_USER, UPLOAD_PICTURE, UPLOAD_DEFAULT_AVATAR } from "../action/user.actions";

const initialState = {};


// Get data to send it at React app (dispatch)
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.playload
        ;
        case UPLOAD_PICTURE:
            return { 
                ...state,   // Send old state for not crush it
                avatar_slug: action.playload // update new element to state
            }
        ;
        case UPLOAD_DEFAULT_AVATAR:
                return {
                    ...state,
                    avatar_slug: action.playload
                }
            ;
        default:
            return state
        ;
    }
};