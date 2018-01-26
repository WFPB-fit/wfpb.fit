import React, { Component } from 'react';

import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import VirtualizedSelect from 'react-virtualized-select'
import SelectField from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

import styled from 'styled-components';

const PaddedDiv = styled.div`
padding:5px;
`;

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
			<Card>
				<PaddedDiv>
					<CardContent />
					<Typography type="headline" component="h2">Filter</Typography>

					<VirtualizedSelect
						name="form-field-name"
						value={this.props.selectedTags}
						onChange={this.props.selectedTagsChanged}
						options={this.props.allTags}
						joinValues
						multi
					/>


					<div>
						<Button onClick={this.addAll}>All Tags</Button>
					</div>

					<div>
						<FormControl>
							<InputLabel htmlFor="sort-select">Sort</InputLabel>
							<SelectField
								input={<Input name="sort" id="sort-select" />}
								value={this.props.sortBy}
								onChange={this.props.sortByChanged}
							>
								<MenuItem value={'year'}>Year</MenuItem>
								<MenuItem value={'availability'}>Availability</MenuItem>
								<MenuItem value={'type'}>Resource Type</MenuItem>
							</SelectField>
						</FormControl>
					</div>

					<CardActions>
						<p>{this.props.numShown} / {this.props.numTotal} Displayed</p>
					</CardActions>
				</PaddedDiv>
			</Card>
		);
	}
}
