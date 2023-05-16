import React, { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

//Pages
const DashboardEcommerce = lazy(() => import('../pages/DashboardEcommerce'));

const Roles = lazy(() => import('../pages/Roles/Roles'));

const Users = lazy(() => import('../pages/Users/Users'));

const Accounts = lazy(() => import('../pages/Accounts/Accounts'));

const Transactions = lazy(() => import('../pages/Transactions/Transactions'));

//login
const Login = lazy(() => import('../pages/Authentication/Login'));
const Logout = lazy(() => import('../pages/Authentication/Logout'));

// User Profile
const UserProfile = lazy(() => import('../pages/Authentication/UserProfile'));

const authProtectedRoutes = [
	{
		path: '/dashboard',
		component: (
			<Suspense fallback={<div />}>
				<DashboardEcommerce />
			</Suspense>
		),
	},
	{
		path: '/index',
		component: (
			<Suspense fallback={<div />}>
				<DashboardEcommerce />
			</Suspense>
		),
	},

	{
		path: '/roles',
		component: (
			<Suspense fallback={<div />}>
				<Roles />
			</Suspense>
		),
	},
	{
		path: '/users',
		component: (
			<Suspense fallback={<div />}>
				<Users />
			</Suspense>
		),
	},
	{
		path: '/accounts',
		component: (
			<Suspense fallback={<div />}>
				<Accounts />
			</Suspense>
		),
	},
	{
		path: '/transactions',
		component: (
			<Suspense fallback={<div />}>
				<Transactions />
			</Suspense>
		),
	},

	//User Profile
	{
		path: '/profile',
		component: (
			<Suspense fallback={<div />}>
				<UserProfile />
			</Suspense>
		),
	},

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
	{
		path: '/logout',
		component: (
			<Suspense fallback={<div />}>
				<Logout />
			</Suspense>
		),
	},
	{
		path: '/login',
		component: (
			<Suspense fallback={<div />}>
				<Login />
			</Suspense>
		),
	},
];

export { authProtectedRoutes, publicRoutes };
