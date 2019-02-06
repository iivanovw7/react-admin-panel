import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import signupReducer from './signup_reducer';
import users from './users'

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  signup: signupReducer,
  users
});

export default rootReducer;