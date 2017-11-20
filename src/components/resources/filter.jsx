import React, { Component } from 'react';
import { Card, CardTitle, CardActions, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
// import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class Filter extends Component {
	addAll() {
		this.handleFilterChange(this.props.allTags);
	}

	//this component needs to handle select state (instead of passing it up like a regular controlled component)
	//due to quirks of the underlying component code. Pass it up after handling it
	handleFilterChange(value) {
		this.setState({ selectedTags: value });
		this.props.handleFormFieldChange('selectedTags', value);
	}
	constructor(props) {
		super(props);
		//bind fucntions to this class
		this.addAll = this.addAll.bind(this);
		this.handleSortFieldChange = this.handleSortFieldChange.bind(this);
		this.handleFilterChange = this.handleFilterChange.bind(this);

		//initialize vars
		this.state = {
			selectedTags: this.props.selectedTags,
			sortLabel: 'year'
		};
	}

	handleSortFieldChange(event, index, sortLabel) {
		this.setState({ sortLabel });
		this.props.handleFormFieldChange('sortBy', sortLabel);
	};

	render() {
		return (
			<div>
				<Card>
					<CardTitle
						title="Filter"
					/>
					<CardText>
						<Select
							name="form-field-name"
							value={this.state.selectedTags}
							onChange={this.handleFilterChange}
							options={this.props.allTags}
							joinValues
							multi
						/>
						<FlatButton label="All Tags" onClick={this.addAll} />

						<div>

							<SelectField
								floatingLabelText="Sort"
								value={this.state.sortLabel}
								onChange={this.handleSortFieldChange}
							>
								<MenuItem value={'year'} primaryText="Year" />
								<MenuItem value={'availability'} primaryText="Availability" />
								<MenuItem value={'type'} primaryText="Resource Type" />
							</SelectField>
							{/* <h3>Years </h3>
							<TextField
								hintText="Min Year"
								type="number"
								defaultValue={this.props.minYear}
								onChange={this.props.handleMinYearChange}
							/>

							<span> - </span>

							<TextField
								hintText="Max Year"
								type="number"
								defaultValue={this.props.maxYear}
								onChange={this.props.handleMaxYearChange}
							/> */}
						</div>
					</CardText>
					<CardActions>
						<RaisedButton label="Submit" primary onClick={this.props.filterSubmitted} />
						<p>{this.props.count} resources</p>
					</CardActions>
				</Card>
			</div>
		);
	}
}
