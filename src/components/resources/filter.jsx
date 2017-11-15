import React, { Component } from 'react';
import { Card, CardTitle, CardActions, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import TextField from 'material-ui/TextField';

export default class Filter extends Component {
	addAll() {
		this.handleSelectChange(this.props.allTags);
	}

	//this component needs to handle select state (instead of passing it up like a regular controlled component)
	//due to quirks of the underlying component code. Pass it up after handling it
	handleSelectChange(value) {
		this.setState({ selectedTags: value });
		this.props.handleSelectChange(value);
	}
	constructor(props) {
		super(props);
		//bind fucntions to this class
		this.addAll = this.addAll.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);

		//initialize vars
		this.state = {
			selectedTags: this.props.selectedTags
		};
	}

	render() {
		return (
			<div>
				<Card>
					<CardTitle
						title="Search"
					/>
					<CardText>
						<Select
							name="form-field-name"
							value={this.state.selectedTags}
							onChange={this.handleSelectChange}
							options={this.props.allTags}
							joinValues
							multi
						/>
						<FlatButton label="All Tags" onClick={this.addAll} />

						<div>
							<h3>Years </h3>
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
							/>
						</div>
					</CardText>
					<CardActions>
						<RaisedButton label="Submit" primary onClick={this.props.filterSubmitted} />
					</CardActions>
				</Card>
			</div>
		);
	}
}
