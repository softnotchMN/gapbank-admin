import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
	Col,
	Container,
	Row,
	Card,
	CardHeader,
	CardBody,
	Table,
} from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import Loader from '../../Components/Common/Loader';
import { request } from '../../services/utilities';

const Roles = () => {
	const [fetching, setFetching] = useState(true);
	const [list, setList] = useState([]);

	const fetchList = useCallback(async () => {
		try {
			const rs = await request('settings/roles');
			setList(rs.data);
			setFetching(false);
		} catch (error) {
			console.log(error);
			setFetching(false);
		}
	}, []);

	useEffect(() => {
		if (fetching) {
			fetchList();
		}
	}, [fetchList, fetching]);

	return (
		<div className="page-content">
			<Container fluid>
				<BreadCrumb title="Users" pageTitle="Users" />
				<Row>
					<Col lg={12}>
						<Card id="usersList">
							<CardHeader className="border-0">
								<Row className="g-4 align-items-center">
									<Col sm={3}></Col>
									<div className="col-sm-auto ms-auto">
										<div className="hstack gap-2">
											<button type="button" className="btn btn-info">
												<i className="ri-add-circle-line align-middle me-1"></i>
												Add Role
											</button>
										</div>
									</div>
								</Row>
							</CardHeader>
							<CardBody className="pt-0">
								<div className="live-preview">
									{!fetching ? (
										<div className="table-responsive">
											<Table className="align-middle table-nowrap mb-0">
												<thead className="table-light">
													<tr>
														<th scope="col">ID</th>
														<th scope="col">Name</th>
														<th scope="col">Description</th>
														<th scope="col">Permissions</th>
													</tr>
												</thead>
												<tbody>
													{list.map((item, i) => (
														<tr key={i}>
															<td>{item.id}</td>
															<td>{item.name}</td>
															<td>{item.description}</td>
															<td>
																<Link to="#" className="fw-medium">
																	view permissions
																</Link>
															</td>
														</tr>
													))}
												</tbody>
											</Table>
										</div>
									) : (
										<Loader />
									)}
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Roles;
