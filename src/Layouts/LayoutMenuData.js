import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navdata = () => {
	const history = useNavigate();
	//state data
	// const [isDashboard, setIsDashboard] = useState(false);

	const [iscurrentState, setIscurrentState] = useState('Dashboard');

	// function updateIconSidebar(e) {
	// 	if (e && e.target && e.target.getAttribute('subitems')) {
	// 		const ul = document.getElementById('two-column-menu');
	// 		const iconItems = ul.querySelectorAll('.nav-icon.active');
	// 		let activeIconItems = [...iconItems];
	// 		activeIconItems.forEach(item => {
	// 			item.classList.remove('active');
	// 			var id = item.getAttribute('subitems');
	// 			if (document.getElementById(id))
	// 				document.getElementById(id).classList.remove('show');
	// 		});
	// 	}
	// }

	useEffect(() => {
		// document.body.classList.remove('twocolumn-panel');
		// if (iscurrentState !== 'Dashboard') {
		// 	setIsDashboard(false);
		// }

		if (iscurrentState === 'Dashboard') {
			// history('/dashboard');
			// document.body.classList.add('twocolumn-panel');
		}
	}, [history, iscurrentState]);

	const menuItems = [
		{
			label: 'Menu',
			isHeader: true,
		},
		{
			id: 'dashboard',
			label: 'Dashboard',
			icon: 'ri-dashboard-2-line',
			link: '/dashboard',
			click: function (e) {
				e.preventDefault();
				setIscurrentState('Dashboard');
			},
		},
		{
			id: 'roles',
			label: 'Roles',
			icon: 'ri-dashboard-2-line',
			link: '/roles',
			click: function (e) {
				e.preventDefault();
				setIscurrentState('Roles');
			},
		},
		{
			id: 'users',
			label: 'Users',
			icon: 'ri-dashboard-2-line',
			link: '/users',
			click: function (e) {
				e.preventDefault();
				setIscurrentState('Users');
			},
		},
		{
			id: 'accounts',
			label: 'Accounts',
			icon: 'ri-dashboard-2-line',
			link: '/accounts',
			click: function (e) {
				e.preventDefault();
				setIscurrentState('Accounts');
			},
		},
		{
			id: 'transactions',
			label: 'Transactions',
			icon: 'ri-dashboard-2-line',
			link: '/transactions',
			click: function (e) {
				e.preventDefault();
				setIscurrentState('Transactions');
			},
		},
	];
	return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
