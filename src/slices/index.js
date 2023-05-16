import { combineReducers } from 'redux';

// Front
import LayoutReducer from './layouts/reducer';

// Authentication
import LoginReducer from './auth/login/reducer';
import ProfileReducer from './auth/profile/reducer';

const rootReducer = combineReducers({
	Layout: LayoutReducer,
	Login: LoginReducer,
	Profile: ProfileReducer,
});

export default rootReducer;
