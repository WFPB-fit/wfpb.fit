import React, { Component } from 'react';

import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from '@material-ui/core/Button';
import VirtualizedSelect from 'react-virtualized-select'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input'; import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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
					<Typography variant="headline">Filter</Typography>

					<VirtualizedSelect
						name="form-field-name"
						value={this.props.selectedTags}
						onChange={this.props.selectedTagsChanged}
						options={this.props.allTags}
						joinValues
						multi
					/>


					<div>
						<Button onClick={this.addAll}>Add All</Button>
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
