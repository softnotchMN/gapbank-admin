//Include Both Helper File with needed methods
import { postJwtLogin, getJwtUser } from '../../../helpers/fakebackend_helper';

import {
	loginSuccess,
	logoutUserSuccess,
	apiError,
	reset_login_flag,
} from './reducer';
import { profileSuccess } from '../profile/reducer';

export const loginUser = (user, history) => async dispatch => {
	try {
		const response = postJwtLogin({
			email: user.email,
			password: user.password,
		});

		var data = await response;

		if (data && data.data) {
			sessionStorage.setItem('authUser', JSON.stringify(data.data));
			dispatch(loginSuccess(data.data));
			dispatch(profileSuccess(data));
			history('/dashboard');
		}
	} catch (error) {
		dispatch(apiError(error));
	}
};

export const logoutUser = () => async dispatch => {
	try {
		sessionStorage.removeItem('authUser');
		dispatch(logoutUserSuccess(true));
	} catch (error) {
		dispatch(apiError(error));
	}
};

export const resetLoginFlag = () => async dispatch => {
	try {
		const response = dispatch(reset_login_flag());
		return response;
	} catch (error) {
		dispatch(apiError(error));
	}
};

export const getUser = () => async dispatch => {
	try {
		const response = getJwtUser();

		var data = await response;

		if (data && data.data) {
			const session = JSON.parse(sessionStorage.getItem('authUser'));
			dispatch(loginSuccess({ user: data.data, token: session.token }));
			dispatch(profileSuccess(data));
		}
	} catch (error) {
		dispatch(logoutUser());
		window.location.href = '/login';
	}
};
