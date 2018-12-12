import React, { Component } from "react";

import Paper from "@material-ui/core/Paper";
import SelectField from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import Resource from "../resource/index.jsx";
import { titleize, alphaCompare } from "../../utils/GeneralUtils.jsx";
import LinkableSelect from "../LinkableSelect";

import StudyMetadataNames from '../../assets/data/study_metadata_names.json';

export default class Resources extends Component {
	handleSelectedTagsChanged(value) {
		this.setState({ selectedTags: value });
	}
	handleSortByChanged(event) {
		this.setState({ sortBy: event.target.value });
	}
	sortResources(a, b) {
		let aVal = a[this.state.sortBy] || 1;
		let bVal = b[this.state.sortBy] || 1;

		if (this.state.sortBy === "type") {
			aVal = StudyMetadataNames.types[aVal] || 1;
			bVal = StudyMetadataNames.types[bVal] || 1;
		} else if (this.state.sortBy === "availability") {
			aVal = StudyMetadataNames.availability[aVal] || 10;
			bVal = StudyMetadataNames.availability[bVal] || 10;
		}

		aVal = parseInt(aVal,10);
		bVal = parseInt(bVal,10);

		const compare = aVal - bVal;
		return (this.state.sortBy ==="year") ? -compare : compare;
	}

	constructor(props) {
		super(props);
		//bind this
		this.sortResources = this.sortResources.bind(this);
		this.getStudiesFromSelectedTags = this.getStudiesFromSelectedTags.bind(
			this
		);
		this.handleSelectedTagsChanged = this.handleSelectedTagsChanged.bind(this);
		this.handleSortByChanged = this.handleSortByChanged.bind(this);

		//initialize vars
		//init state first
		this.state = {
			selectedTags: [],
			sortBy: "year",
			tags:[]
		};

		//find all selectable tags
		let tags = this.props.tags;
		if (!this.props.tags) {
			tags = Object.keys(this.props.research);
		}
		tags = tags.map(tag => {
			return { value: tag, label: titleize(tag) };
		});
		this.setState({tags: tags.sort(alphaCompare)});

		//find number of unique resources
		const taggedResources = Object.values(this.props.research);
		const allResearch = Object.values(
			taggedResources.reduce((total, currResources) => {
				for (const r of currResources) total[r.title] = r;
				return total;
			}, {})
		);
		this.numTotal = allResearch.length;
	}

	getStudiesFromSelectedTags() {
		let selectedResources = {};
		for (const selectedTagObj of this.state.selectedTags) {
			const tag = selectedTagObj.value;
			const resources = this.props.research[tag];
			if (resources) {
				for (const r of resources) selectedResources[r.title] = r;
			} else console.log(`${tag} resources is empty`);
		}
		return Object.values(selectedResources).sort(this.sortResources);
	}

	render() {
		const resources = this.getStudiesFromSelectedTags();

		return (
			<div>
				<Paper style={{ padding: "10px" }}>
					<Typography variant="h4">Filter</Typography>
					<LinkableSelect
						value={this.state.selectedTags}
						onChange={this.handleSelectedTagsChanged}
						options={this.state.tags}
					/>
					<FormControl>
						<InputLabel htmlFor="sort-select">Sort</InputLabel>
						<SelectField
							input={<Input name="sort" id="sort-select" />}
							value={this.state.sortBy}
							onChange={this.handleSortByChanged}
						>
							<MenuItem value={"year"}>Year</MenuItem>
							<MenuItem value={"availability"}>Availability</MenuItem>
							<MenuItem value={"type"}>Resource Type</MenuItem>
						</SelectField>
					</FormControl>
					<Typography>
						{resources.length} / {this.numTotal} Displayed
					</Typography>
				</Paper>

				{resources.map(x => (
					<Resource resource={x} key={x.id} />
				))}
			</div>
		);
	}
}
