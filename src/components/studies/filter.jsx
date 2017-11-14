import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import TextField from 'material-ui/TextField';

export default class Filter extends Component {
	clearAll() {
		this.setState({selectedTags: []});
	}
	addAll() {
		this.setState({selectedTags: this.props.allTags});
	}
	handleSelectChange(value){
		this.setState({selectedTags:value});
	}

	constructor(props) {
		super(props);
		//bind fucntions to this class
		this.addAll = this.addAll.bind(this);
		this.clearAll = this.clearAll.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);

		//initialize vars
		this.state = {
			selectedTags: this.props.selectedTags,
			minYear:this.props.minYear,
			maxYear:this.props.maxYear
		}
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
		console.log(this.state)
	}

	render() {
		return (
			<div>
				<Card>
					<CardHeader
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
						<div>
							<TextField
								hintText="Min Year"
								type="number"
								defaultValue={this.state.minYear}
								onChange={this.handleInputChange}
							/>
							<TextField
								hintText="Max Year"
								type="number"
								defaultValue={this.state.maxYear}
								onChange={this.handleInputChange}
							/>
						</div>
					</CardText>
					<CardActions>
						<RaisedButton label="Submit" primary onClick={this.props.filterSubmitted(this.state)} />
						<FlatButton label="All" onClick={this.addAll} />
						<FlatButton label="None" onClick={this.clearAll} />
					</CardActions>
				</Card>
			</div>
		);
	}
}
