import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices';
import { getUser } from './slices/thunks';
import { createLogger } from 'redux-logger';

let middlewares = [];

if (process.env.NODE_ENV !== 'production') {
	const logger = createLogger({ collapsed: true });

	middlewares = [...middlewares, logger];
}

const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(middlewares),
	devTools: true,
});

const root = ReactDOM.createRoot(document.getElementById('root'));

if (JSON.parse(sessionStorage.getItem('authUser'))) {
	store.dispatch(getUser());
}

root.render(
	<Provider store={store}>
		<React.Fragment>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<App />
			</BrowserRouter>
		</React.Fragment>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
