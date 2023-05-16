import React, { useState, useEffect, useCallback } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Widget from './Widgets';
import Section from './Section';
import Loader from '../../Components/Common/Loader';
import { request } from '../../services/utilities';

const DashboardEcommerce = () => {
	document.title = 'Dashboard | Gap Finance';

	const [fetching, setFetching] = useState(true);
	const [analytics, setAnalytics] = useState(null);

	const fetchAnalytics = useCallback(async () => {
		try {
			const rs = await request('utility/analytics');
			setAnalytics(rs.data);
			setFetching(false);
		} catch (error) {
			console.log(error);
			setFetching(false);
		}
	}, []);

	useEffect(() => {
		if (fetching) {
			fetchAnalytics();
		}
	}, [fetchAnalytics, fetching]);

	return (
		<React.Fragment>
			<div className="page-content">
				{fetching ? (
					<Loader />
				) : (
					<Container fluid>
						<Row>
							<Col>
								<div className="h-100">
									<Section />
									<Row>
										<Widget analytics={analytics} />
									</Row>
								</div>
							</Col>
						</Row>
					</Container>
				)}
			</div>
		</React.Fragment>
	);
};

export default DashboardEcommerce;
