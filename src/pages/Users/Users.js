import React, { useEffect, useState, useCallback } from 'react';
import {
	Col,
	Container,
	Row,
	Card,
	CardHeader,
	CardBody,
	Input,
	Table,
} from 'reactstrap';

import BreadCrumb from '../../Components/Common/BreadCrumb';

import AppPagination from '../../Components/Common/AppPagination';

import Loader from '../../Components/Common/Loader';
import { request, formatDate } from '../../services/utilities';
import { fulldate } from '../../services/constants';

const Users = () => {
	const [fetching, setFetching] = useState(true);
	const [list, setList] = useState([]);
	const [meta, setMeta] = useState(null);

	const fetchList = useCallback(async (page, search) => {
		try {
			const p = page || 1;
			const q = search || '';
			const rs = await request(`users?page=${p}&limit=${10}&q=${q}`);
			const { result, ...meta } = rs.data;
			setMeta(meta);
			setList(result);
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

	const onNavigatePage = async nextPage => {
		await fetchList(nextPage, '');
	};

	return (
		<div className="page-content">
			<Container fluid>
				<BreadCrumb title="Users" pageTitle="Users" />
				<Row>
					<Col lg={12}>
						<Card id="usersList">
							<CardHeader className="border-0">
								<Row className="g-4 align-items-center">
									<Col sm={3}>
										<div className="search-box">
											<Input
												type="text"
												className="form-control search"
												placeholder="Search for..."
											/>
											<i className="ri-search-line search-icon"></i>
										</div>
									</Col>
									<div className="col-sm-auto ms-auto">
										<div className="hstack gap-2">
											<button type="button" className="btn btn-info">
												<i className="ri-search-line align-bottom me-1"></i>{' '}
												Search
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
														<th scope="col">Customer</th>
														<th scope="col">Email</th>
														<th scope="col">Activated</th>
														<th scope="col">Status</th>
														<th scope="col">Date</th>
													</tr>
												</thead>
												<tbody>
													{list.map((item, i) => (
														<tr key={i}>
															<td>{item.id}</td>
															<td>
																<div className="d-flex gap-2 align-items-center">
																	<div className="flex-shrink-0">
																		<img
																			src={`${process.env.REACT_APP_API_URL}/${item.profile.avatar}`}
																			alt=""
																			className="avatar-xs rounded-circle"
																		/>
																	</div>
																	<div className="flex-grow-1">
																		{item.profile?.firstname
																			? item.profile.fullname
																			: '--'}
																	</div>
																</div>
															</td>
															<td>{item.email}</td>
															<td>
																{item.activatedAt ? (
																	formatDate(item.activatedAt, fulldate)
																) : (
																	<span className="badge bg-danger">
																		account inactive
																	</span>
																)}
															</td>
															<td
																className={
																	item.isDeleted || !item.enabled
																		? 'text-danger'
																		: 'text-success'
																}
															>
																{item.isDeleted && (
																	<>
																		<i className=" ri-indeterminate-circle-line fs-17 align-middle"></i>{' '}
																		deleted
																	</>
																)}
																{!item.enabled && (
																	<>
																		<i className="ri-close-circle-line fs-17 align-middle"></i>{' '}
																		disabled
																	</>
																)}
																{!item.isDeleted && item.enabled && (
																	<>
																		<i className="ri-checkbox-circle-line fs-17 align-middle"></i>{' '}
																		enabled
																	</>
																)}
															</td>
															<td>{formatDate(item.createdAt, fulldate)}</td>
														</tr>
													))}
												</tbody>
											</Table>
											<AppPagination
												meta={meta}
												onNavigatePage={onNavigatePage}
											/>
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

export default Users;
