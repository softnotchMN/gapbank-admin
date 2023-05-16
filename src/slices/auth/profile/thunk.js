//Include Both Helper File with needed methods
import { postJwtProfile } from '../../../helpers/fakebackend_helper';

// action
import {
	profileSuccess,
	profileError,
	resetProfileFlagChange,
} from './reducer';

export const editProfile = user => async dispatch => {
	try {
		const response = postJwtProfile({
			username: user.username,
			idx: user.idx,
		});

		const data = await response;

		if (data) {
			dispatch(profileSuccess(data));
		}
	} catch (error) {
		dispatch(profileError(error));
	}
};

export const resetProfileFlag = () => {
	try {
		const response = resetProfileFlagChange();
		return response;
	} catch (error) {
		return error;
	}
};
