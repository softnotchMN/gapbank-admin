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
import AppPagination from '../../Components/Common/AppPagination';
import BreadCrumb from '../../Components/Common/BreadCrumb';

//redux
import { request, formatDate, formatCurrency } from '../../services/utilities';
import { fulldate } from '../../services/constants';

import Loader from '../../Components/Common/Loader';

const Accounts = () => {
	const [fetching, setFetching] = useState(true);
	// eslint-disable-next-line no-unused-vars
	const [working, setWorking] = useState(false);
	const [list, setList] = useState([]);
	const [meta, setMeta] = useState(null);
	const [searched, setSearched] = useState(false);
	const [search, setSearch] = useState('');

	const fetchList = useCallback(async (page, search) => {
		try {
			const p = page || 1;
			const q = search || '';
			const rs = await request(`accounts?page=${p}&limit=${10}&q=${q}`);
			const { result, ...meta } = rs.data;
			setMeta(meta);
			setList(result);
			setFetching(false);
			setWorking(false);
		} catch (error) {
			console.log(error);
			setFetching(false);
			setWorking(false);
		}
	}, []);

	useEffect(() => {
		if (fetching) {
			fetchList();
		}
	}, [fetchList, fetching]);

	const onNavigatePage = async nextPage => {
		setWorking(true);
		await fetchList(nextPage, search);
	};

	const doSearch = async () => {
		if (search === '') {
			return;
		}

		setWorking(true);
		setSearched(true);
		await fetchList(1, search);
	};

	const clear = async () => {
		setWorking(true);
		setSearch('');
		setSearched(false);
		await fetchList(1, '', '');
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
												value={search}
												onChange={e => setSearch(e.target.value)}
											/>
											<i className="ri-search-line search-icon"></i>
										</div>
									</Col>
									<div className="col-sm-auto ms-auto">
										<div className="hstack gap-2">
											<button
												type="button"
												className="btn btn-info"
												onClick={() => doSearch()}
											>
												<i className="ri-search-line align-bottom me-1"></i>{' '}
												Search
											</button>
											{searched && (
												<button
													type="button"
													className="btn btn-dark btn-sm ms-2"
													onClick={() => clear()}
												>
													clear
												</button>
											)}
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
														<th scope="col">Balance</th>
														<th scope="col">Account No</th>
														<th scope="col">Business Name</th>
														<th scope="col">Type</th>
														<th scope="col">Category</th>
														<th scope="col">Tier</th>
														<th scope="col">State</th>
														<th scope="col">Status</th>
														<th scope="col">Date</th>
													</tr>
												</thead>
												<tbody>
													{list.map((item, i) => (
														<tr key={i}>
															<td>{i + 1}</td>
															<td>
																{item.user.profile?.firstname
																	? item.user.profile?.fullname
																	: '--'}
															</td>
															<td>{formatCurrency(item.balance)}</td>
															<td>{item.accountNumber}</td>
															<td>{item.businessName || '--'}</td>
															<td>{item.type}</td>
															<td>{item.category}</td>
															<td>{`Tier ${item.currentTier.tier}`}</td>
															<td>
																{item.isActive ? (
																	<span className="badge bg-success">
																		active
																	</span>
																) : (
																	<span className="badge bg-danger">
																		dormant
																	</span>
																)}
															</td>
															<td
																className={
																	!item.isOpen ? 'text-danger' : 'text-success'
																}
															>
																{item.isOpen ? (
																	<>
																		<i className="ri-checkbox-circle-line fs-17 align-middle"></i>{' '}
																		open
																	</>
																) : (
																	<>
																		<i className="ri-close-circle-line fs-17 align-middle"></i>{' '}
																		closed
																	</>
																)}
															</td>
															<td>{formatDate(item.createdAt, fulldate)}</td>
														</tr>
													))}
													{list.length === 0 && (
														<tr>
															<td colSpan="11" className="text-center">
																No accounts found!
															</td>
														</tr>
													)}
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

export default Accounts;
