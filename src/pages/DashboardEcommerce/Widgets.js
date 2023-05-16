import React from 'react';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';

const Widgets = ({ analytics }) => {
	const ecomWidgets = [
		{
			id: 1,
			cardColor: 'primary',
			label: 'Transactions',
			badge: 'ri-arrow-right-up-line',
			badgeClass: 'success',
			percentage: '',
			counter: analytics?.transactions || 0,
			link: 'View all transactions',
			bgcolor: 'success',
			icon: 'bx bx-dollar-circle',
			decimals: 2,
			prefix: '$',
			suffix: '',
			uri: '/transactions',
		},
		{
			id: 2,
			cardColor: 'secondary',
			label: 'Accounts',
			badge: 'ri-arrow-right-down-line',
			badgeClass: 'danger',
			percentage: '',
			counter: analytics?.accounts || 0,
			link: 'View all account',
			bgcolor: 'info',
			icon: 'bx bx-shopping-bag',
			decimals: 0,
			prefix: '',
			separator: ',',
			suffix: '',
			uri: '/accounts',
		},
		{
			id: 3,
			cardColor: 'success',
			label: 'Customers',
			badge: 'ri-arrow-right-up-line',
			badgeClass: 'success',
			percentage: '',
			counter: analytics?.customers || 0,
			link: 'View all users',
			bgcolor: 'warning',
			icon: 'bx bx-user-circle',
			decimals: 0,
			prefix: '',
			suffix: '',
			uri: '/customers',
		},
		{
			id: 4,
			cardColor: 'info',
			label: 'My Balance',
			badgeClass: 'muted',
			percentage: '',
			counter: analytics?.balance || 0,
			link: 'Balance',
			bgcolor: 'primary',
			icon: 'bx bx-wallet',
			decimals: 2,
			prefix: '$',
			suffix: '',
			uri: '/dashboard',
		},
	];

	return (
		<React.Fragment>
			{ecomWidgets.map((item, key) => (
				<Col xl={3} md={6} key={key}>
					<Card className="card-animate">
						<CardBody>
							<div className="d-flex align-items-center">
								<div className="flex-grow-1 overflow-hidden">
									<p className="text-uppercase fw-medium text-muted text-truncate mb-0">
										{item.label}
									</p>
								</div>
								{item.percentage !== '' && (
									<div className="flex-shrink-0">
										<h5 className={'fs-14 mb-0 text-' + item.badgeClass}>
											{item.badge ? (
												<i className={'fs-13 align-middle ' + item.badge}></i>
											) : null}{' '}
											{item.percentage} %
										</h5>
									</div>
								)}
							</div>
							<div className="d-flex align-items-end justify-content-between mt-4">
								<div>
									<h4 className="fs-22 fw-semibold ff-secondary mb-4">
										<span className="counter-value" data-target="559.25">
											<CountUp
												start={0}
												prefix={item.prefix}
												suffix={item.suffix}
												separator={item.separator}
												end={item.counter}
												decimals={item.decimals}
												duration={4}
											/>
										</span>
									</h4>
									<Link to={item.uri} className="text-decoration-underline">
										{item.link}
									</Link>
								</div>
								<div className="avatar-sm flex-shrink-0">
									<span
										className={
											'avatar-title rounded fs-3 bg-soft-' + item.bgcolor
										}
									>
										<i className={`text-${item.bgcolor} ${item.icon}`}></i>
									</span>
								</div>
							</div>
						</CardBody>
					</Card>
				</Col>
			))}
		</React.Fragment>
	);
};

export default Widgets;
