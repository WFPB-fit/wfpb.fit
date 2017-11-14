import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import TextField from 'material-ui/TextField';
import titleize from '../../utils/titleize';
// import titleize from '../../utils/titleize'

export default class FilterTable extends Component {
	static convertTagsToSelectValueObject(tags){
		let newTags = [];
		for (const tag of tags){
			newTags.push(
				{ value: tag, label: titleize(tag) }
			);
		}
		return newTags;
	}

	clearAll() {
		this.setState({ selectedTags: [] });
	}
	addAll() {
		const tags = FilterTable.convertTagsToSelectValueObject(this.props.tags)
		this.setState({ selectedTags: tags });
	}
	constructor(props) {
		super(props);
		//bind fucntions to this class
		this.addAll = this.addAll.bind(this);
		this.clearAll = this.clearAll.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);

		//initialize vars
    this.state = {
			value: [],
			selectedTags:FilterTable.convertTagsToSelectValueObject(props.tags)
		};
	}

	handleSelectChange(value) {
		this.setState({selectedTags: value})
	}

	render() {
		let Ui = (
			<div>
				<FlatButton label="All" onClick={this.addAll} />
				<FlatButton label="None" onClick={this.clearAll} />
			</div>
		);

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
							options={FilterTable.convertTagsToSelectValueObject(this.props.tags)}
							joinValues
							multi
						/>
						<div>
							<TextField
								hintText="Min Year"
							/>
							<TextField
								hintText="Max Year"
							/>
						</div>
					</CardText>
					<CardActions>
						{Ui}
					</CardActions>
				</Card>
			</div>
		);
	}
}
