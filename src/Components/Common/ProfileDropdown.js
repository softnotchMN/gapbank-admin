import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from 'reactstrap';

const ProfileDropdown = () => {
	const user = useSelector(state => state.Login.user);

	const [userName, setUserName] = useState('');

	useEffect(() => {
		if (sessionStorage.getItem('authUser')) {
			const obj = JSON.parse(sessionStorage.getItem('authUser'));
			setUserName(obj.user.profile.fullname);
		}
	}, [userName, user]);

	//Dropdown Toggle
	const [isProfileDropdown, setIsProfileDropdown] = useState(false);
	const toggleProfileDropdown = () => {
		setIsProfileDropdown(!isProfileDropdown);
	};
	return (
		<React.Fragment>
			<Dropdown
				isOpen={isProfileDropdown}
				toggle={toggleProfileDropdown}
				className="ms-sm-3 header-item topbar-user"
			>
				<DropdownToggle tag="button" type="button" className="btn">
					<span className="d-flex align-items-center">
						<img
							className="rounded-circle header-profile-user"
							src={`${process.env.REACT_APP_API_URL}/${
								user?.user?.profile?.avatar || ''
							}`}
							alt="Header Avatar"
						/>
						<span className="text-start ms-xl-2">
							<span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
								{userName}
							</span>
							<span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
								Admin
							</span>
						</span>
					</span>
				</DropdownToggle>
				<DropdownMenu className="dropdown-menu-end">
					<h6 className="dropdown-header">Welcome {userName}!</h6>
					<DropdownItem className="p-0">
						<Link
							to={process.env.PUBLIC_URL + '/profile'}
							className="dropdown-item"
						>
							<i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
							<span className="align-middle">Profile</span>
						</Link>
					</DropdownItem>
					<div className="dropdown-divider"></div>
					<DropdownItem className="p-0">
						<Link
							to={process.env.PUBLIC_URL + '/logout'}
							className="dropdown-item"
						>
							<i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{' '}
							<span className="align-middle" data-key="t-logout">
								Logout
							</span>
						</Link>
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</React.Fragment>
	);
};

export default ProfileDropdown;
