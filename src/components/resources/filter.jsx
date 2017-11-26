import React, { Component } from 'react';
import { Card, CardTitle, CardActions, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class Filter extends Component {
	addAll() {
		this.props.selectedTagsChanged(this.props.allTags);
	}

	constructor(props) {
		super(props);
		//bind fucntions to this class
		this.addAll = this.addAll.bind(this);
	}

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
							value={this.props.selectedTags}
							onChange={this.props.selectedTagsChanged}
							options={this.props.allTags}
							joinValues
							multi
						/>
						<FlatButton label="All Tags" onClick={this.addAll} />

						<div>
							<SelectField
								floatingLabelText="Sort"
								value={this.props.sortBy}
								onChange={this.props.sortByChanged}
							>
								<MenuItem value={'year'} primaryText="Year" />
								<MenuItem value={'availability'} primaryText="Availability" />
								<MenuItem value={'type'} primaryText="Resource Type" />
							</SelectField>
						</div>
					</CardText>
					<CardActions>
						<p>{this.props.numTotal} Total, {this.props.numShown} Displayed</p>
					</CardActions>
				</Card>
			</div>
		);
	}
}
