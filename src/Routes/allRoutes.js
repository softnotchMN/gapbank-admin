import React from 'react';
import { Navigate } from 'react-router-dom';

//Pages
import DashboardEcommerce from '../pages/DashboardEcommerce';

import Roles from '../pages/Roles/Roles';

import Users from '../pages/Users/Users';

import Accounts from '../pages/Accounts/Accounts';

import Transactions from '../pages/Transactions/Transactions';

//login
import Login from '../pages/Authentication/Login';
import Logout from '../pages/Authentication/Logout';

// User Profile
import UserProfile from '../pages/Authentication/UserProfile';

const authProtectedRoutes = [
	{ path: '/dashboard', component: <DashboardEcommerce /> },
	{ path: '/index', component: <DashboardEcommerce /> },

	{ path: '/roles', component: <Roles /> },
	{ path: '/users', component: <Users /> },
	{ path: '/accounts', component: <Accounts /> },
	{ path: '/transactions', component: <Transactions /> },

	//User Profile
	{ path: '/profile', component: <UserProfile /> },

	// this route should be at the end of all other routes
	// eslint-disable-next-line react/display-name
	{
		path: '/',
		exact: true,
		component: <Navigate to="/dashboard" />,
	},
	{ path: '*', component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
	// Authentication Page
	{ path: '/logout', component: <Logout /> },
	{ path: '/login', component: <Login /> },
];

export { authProtectedRoutes, publicRoutes };
