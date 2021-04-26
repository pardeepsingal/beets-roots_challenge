import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Filter extends Component {
	static propTypes = {
		data: PropTypes.instanceOf(Array),
	};
	static defaultProperty = {
		data: [],
	};
	constructor(props) {
		super(props);
		this.state = {
			activeRecords: 0,
			filteredData: [],
			showData: false,
			userInput: '',
		};
	}
	onChange = (e) => {
		const { data } = this.props;
		const searchText = e.currentTarget.value;
		const searchedVal = searchText.toLowerCase().trim();
		const filteredData = data.filter((item) => {
			return Object.keys(item).some((key) => item[key].toString().toLowerCase().includes(searchedVal));
		});
		this.setState({
			activeRecords: 0,
			filteredData,
			showData: true,
			userInput: searchText,
		});
	};

	onClick = (e) => {
		const { activeRecords, filteredData } = this.state;
		let index = e.target.getAttribute('data-index');
		let selectedVal = filteredData[index];
		console.log({ selectedVal });
		console.log(index);
		console.log({ filteredData });
		this.setState({
			activeRecords: 0,
			filteredData: [],
			showData: false,
			userInput: selectedVal['name'],
		});
	};

	onKeyDown = (e) => {
		const { activeRecords, filteredData } = this.state;
		if (e.keyCode === 13) {
			let selectedVal = filteredData[activeRecords];
			this.setState({
				activeRecords: 0,
				showData: false,
				userInput: selectedVal.name,
			});
		} else if (e.keyCode === 38) {
			if (activeRecords === 0) {
				return;
			}

			this.setState({ activeRecords: activeRecords - 1 });
		} else if (e.keyCode === 40) {
			if (activeRecords - 1 === filteredData.length) {
				return;
			}

			this.setState({ activeRecords: activeRecords + 1 });
		}
	};

	render() {
		const {
			onChange,
			onClick,
			onKeyDown,
			state: { activeRecords, filteredData, showData, userInput },
		} = this;
		let DataListView;

		if (showData && userInput) {
			if (filteredData.length) {
				DataListView = (
					<ul className="list-group">
						{filteredData.map((suggestion, index) => {
							let className = 'list-group-item';

							if (index === activeRecords) {
								className = 'list-group-item active';
							} else {
							}

							return (
								<li className={className} data-index={index} ref={index} onClick={onClick} key={index}>
									<b>{suggestion.id} </b>
									<br />
									<i>{suggestion.name} </i>
									<br />
									<small>{suggestion.address + ' ' + suggestion.pincode}</small>
								</li>
							);
						})}
					</ul>
				);
			} else {
				DataListView = (
					<ul className="list-group">
						<li className="list-group-item" key={'no-data'}>
							No User Found
						</li>
					</ul>
				);
			}
		}

		return (
			<React.Fragment>
				<div className="container">
					<div className="row">
						<div className="form-group col-lg-4">
							<div className="form-group">
								<div className="form-group has-search">
									<label className="control-label">Filter</label>
									<span className="fa fa-search form-control-feedback"></span>
									<input
										type="search"
										className="form-control"
										onChange={onChange}
										onKeyDown={onKeyDown}
										value={userInput}
										placeholder="Search users by ID,address,nam..."
									/>
								</div>
							</div>
							{DataListView}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Filter;
