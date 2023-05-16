import numeral from 'numeral';
import * as moment from 'moment';
import { TOKEN_COOKIE, API_URI } from './constants';

const checkStatus = async response => {
	if (!response.ok) {
		if (response.statusText === 'Unauthorized') {
			// prettier-ignore
			const token = JSON.parse(sessionStorage.getItem(TOKEN_COOKIE));
			if (token) {
				// prettier-ignore
				sessionStorage.removeItem(TOKEN_COOKIE);

				window.location.reload();
			}
		}
		const message = await response.text();
		const err = JSON.parse(message);
		throw Object.freeze({ message: err.message || err.error });
	}

	return response;
};

const parseJSON = response => response.json();

export async function request(uri, { body, ...customConfig } = {}) {
	const subdomain = window.location.hostname.split('.')[0];

	let headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'Sub-Domain': subdomain,
	};

	// prettier-ignore
	const token = JSON.parse(sessionStorage.getItem("authUser")) ? JSON.parse(sessionStorage.getItem("authUser")).token : null;

	if (token) {
		const jwt = `Bearer ${token}`;
		headers = customConfig.uploader
			? { Authorization: jwt }
			: { ...headers, Authorization: jwt };
	}

	const config = {
		method: body ? 'POST' : 'GET',
		...customConfig,
		headers: { ...headers },
	};

	if (body) {
		config.body = customConfig.uploader ? body : JSON.stringify(body);
	}

	const response = await fetch(`${API_URI}/${uri}`, config);
	const result = await checkStatus(response);

	return parseJSON(result);
}

export function updateImmutable(list, payload) {
	const data = list.find(d => d.id === payload.id);
	if (data) {
		const index = list.findIndex(d => d.id === payload.id);

		return [
			...list.slice(0, index),
			{ ...data, ...payload },
			...list.slice(index + 1),
		];
	}

	return list;
}

export function formatCurrency(amount, abs) {
	return `₦${numeral(abs ? Math.abs(amount || 0) : amount).format('0,0.00')}`;
}

export function formatDate(date, format = 'YYYY-MM-DD') {
	return date ? moment(date).format(format) : '--';
}
