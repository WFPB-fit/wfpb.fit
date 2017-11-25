import React, { Component } from 'react';
import Resource from '../resource/index.jsx';
import Filter from './filter';
import { titleize } from '../../utils/GeneralUtils.jsx';

export default class Resources extends Component {
	static convertTagsToSelectValueObject(tags) {
		let newTags = [];
		for (const tag of tags) {
			newTags.push(
				{ value: tag, label: titleize(tag) }
			);
		}
		const sortedTags = newTags.sort((a, b) => a.value.localeCompare(b.value));
		return sortedTags;
	}

	static selectableTagsToArray(selectable) {
		let tags = [];
		for (const option of selectable) {
			tags.push(option.value);
		}
		return tags;
	}

	static allResourcesTags(resources) {
		let uniqueTags = new Set();
		for (const resource of resources) {
			for (const tag of resource.tags) {
				uniqueTags.add(tag);
			}
		}
		return Array.from(uniqueTags);
	}

	submitFilters() {
		let stateCopy = Object.assign({}, this.state);
		const newState = Object.assign(stateCopy, this.inputFilters);
		this.setState(newState);
	}

	handleFormFieldChange(name, value) {
		this.inputFilters[name] = value;
	}

	sortResources(a, b) {
		let aVal = a[this.state.sortBy] || 1;
		let bVal = b[this.state.sortBy] || 1;

		if (this.state.sortBy === 'type') {
			aVal = this.typeScore[aVal] || 1;
			bVal = this.typeScore[bVal] || 1;
		}
		else if (this.state.sortBy === 'availability') {
			aVal = this.availabilityScore[aVal] || 10;
			bVal = this.availabilityScore[bVal] || 10;
		}

		return bVal - aVal;
	}

	constructor(props) {
		super(props);

		//bind this
		this.submitFilters = this.submitFilters.bind(this);
		this.handleFormFieldChange = this.handleFormFieldChange.bind(this);
		this.sortResources = this.sortResources.bind(this);
		this.getStudiesFromSelectedTags = this.getStudiesFromSelectedTags.bind(this);

		//initialize vars
		let tags = this.props.tags;
		if (!this.props.tags) {
			tags = Resources.allResourcesTags(this.props.research);
		}
		this.selectableTags = Resources.convertTagsToSelectValueObject(tags);

		this.state = {
			resources: this.props.research,
			selectedTags: this.selectableTags,
			sortBy: 'year'
		};
		this.inputFilters = {
			selectedTags: this.state.selectedTags,
			sortBy: 'year'
		};
		this.typeScore = {
			'research report': 3,
			'meta analysis': 2,
			'study': 1,
			'article': 0
		}
		this.availabilityScore = {
			'full': 3,
			'abstract': 2,
			'paywall': 1
		}
	}

	getStudiesFromSelectedTags() {
		let selectedResources = {};
		for (const selectedTagObj of this.state.selectedTags) {
			const tag = selectedTagObj.value;
			const resources = this.state.resources[tag];
			console.log(this.state.resources,resources,tag,this.state.selectedTags)
			for (const r of resources) selectedResources[r.title] = r;
		}
		return Object.values(selectedResources).sort(this.sortResources);
	}

	render() {
		const resources = this.getStudiesFromSelectedTags();

		return (
			<div>
				<Filter
					handleFormFieldChange={this.handleFormFieldChange}
					selectedTags={this.inputFilters.selectedTags}
					allTags={this.selectableTags}
					filterSubmitted={this.submitFilters}
					count={resources.length}
				/>
				{
					resources.map((x) => (
						<Resource
							resource={x}
							key={x.id}
						/>
					))
				}
			</div>
		);
	}
}
