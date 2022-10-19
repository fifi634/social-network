import { combineReducers } from 'redux';
import usersReducer from './users.reducer';
import userReducer from './user.reducer';
import postReducer from './post.reducer';
import errorReducer from './errors.reducer';

export default combineReducers({
    usersReducer,
    userReducer,
    postReducer,
    errorReducer
});
