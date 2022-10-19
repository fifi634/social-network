import { UPDATE_USER_ERRORS } from "../action/user.actions";

const initialState = {updateUserErrors: []};

export default function errorReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER_ERRORS:
            return {
                updateUserErrors : action.payload,
                setErrors: []
            }
        ;
        default:
            return state
        ;
    };
};