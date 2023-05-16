import React, { useState } from 'react';
import {
	Dropdown,
	DropdownMenu,
	DropdownToggle,
	TabContent,
	TabPane,
} from 'reactstrap';

//import images
import bell from '../../assets/images/svg/bell.svg';

//SimpleBar
// import SimpleBar from 'simplebar-react';

const NotificationDropdown = () => {
	//Dropdown Toggle
	const [isNotificationDropdown, setIsNotificationDropdown] = useState(false);
	const toggleNotificationDropdown = () => {
		setIsNotificationDropdown(!isNotificationDropdown);
	};

	//Tab
	const [activeTab] = useState('1');

	return (
		<React.Fragment>
			<Dropdown
				isOpen={isNotificationDropdown}
				toggle={toggleNotificationDropdown}
				className="topbar-head-dropdown ms-1 header-item"
			>
				<DropdownToggle
					type="button"
					tag="button"
					className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
				>
					<i className="bx bx-bell fs-22"></i>
					<span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-secondary">
						0<span className="visually-hidden">unread messages</span>
					</span>
				</DropdownToggle>
				<DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
					<TabContent activeTab={activeTab}>
						<TabPane tabId="1" className="p-4">
							<div className="w-25 w-sm-50 pt-3 mx-auto">
								<img src={bell} className="img-fluid" alt="user-pic" />
							</div>
							<div className="text-center pb-5 mt-2">
								<h6 className="fs-18 fw-semibold lh-base">
									Hey! You have no any notifications{' '}
								</h6>
							</div>
						</TabPane>
					</TabContent>
				</DropdownMenu>
			</Dropdown>
		</React.Fragment>
	);
};

export default NotificationDropdown;
