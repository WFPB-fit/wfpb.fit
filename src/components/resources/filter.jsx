import React, { Component } from 'react';
import { Card, CardTitle, CardActions, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import VirtualizedSelect from 'react-virtualized-select'
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
						<VirtualizedSelect
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
						<p>{this.props.numShown} / {this.props.numTotal} Displayed</p>
					</CardActions>
				</Card>
			</div>
		);
	}
}
