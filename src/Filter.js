import React, { useState, useRef } from 'react';
const Filter = (props) => {
	const [activeRecords, setActiveRecords] = useState(0);
	const [filteredData, setFilteredData] = useState([]);
	const [showData, setShowData] = useState(false);
	const [userInput, setUserInput] = useState('');

	const listRef = useRef();

	const onChange = (e) => {
		const { data } = props;
		const searchText = e.currentTarget.value;
		const searchedVal = searchText.toLowerCase().trim();
		const filteredData = data.filter((item) => {
			return Object.keys(item).some((key) => item[key].toString().toLowerCase().includes(searchedVal));
		});
		setActiveRecords(0);
		setFilteredData(filteredData);
		setShowData(true);
		setUserInput(searchText);
	};

	const onClick = (e) => {
		let index = e.target.getAttribute('data-index');
		let selectedVal = filteredData[index];
		setActiveRecords(0);
		setFilteredData([]);
		setShowData(false);
		setUserInput(selectedVal['name']);
	};

	const onKeyDown = (e) => {
		if (e.keyCode === 13) {
			let selectedVal = filteredData[activeRecords];
			setActiveRecords(0);
			setShowData(false);
			setUserInput(selectedVal.name);
		} else if (e.keyCode === 38) {
			if (activeRecords === 0) {
				return;
			}
			var elHeight = 97;
			var scrollTop = listRef.current.scrollTop;
			var viewport = scrollTop + 300;
			var elOffset = elHeight * activeRecords - elHeight;
			if (elOffset < scrollTop || elOffset + elHeight > viewport) {
				listRef.current.scrollTo(0, elOffset);
			}

			setActiveRecords(activeRecords - 1);
		} else if (e.keyCode === 40) {
			if (activeRecords - 1 === filteredData.length) {
				return;
			}
			var elHeight = 97;
			var scrollTop = listRef.current.scrollTop;
			var viewport = scrollTop + 300;
			var elOffset = elHeight * activeRecords + elHeight;
			if (elOffset < scrollTop || elOffset + elHeight > viewport) {
				listRef.current.scrollTo(0, elOffset);
			}

			setActiveRecords(activeRecords + 1);
		}
	};

	let DataListView;
	if (showData && userInput) {
		if (filteredData.length) {
			DataListView = (
				<ul className="list-group" ref={listRef}>
					{filteredData.map((suggestion, index) => {
						let className = 'list-group-item';

						if (index === activeRecords) {
							className = 'list-group-item active';
						} else {
						}

						return (
							<li className={className} data-index={index} onClick={onClick} key={index} tabIndex={index}>
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
	);
};
export default Filter;
