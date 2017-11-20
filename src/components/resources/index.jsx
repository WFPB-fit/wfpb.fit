import React, { Component } from 'react';
import Resource from '../resource/index.jsx';
import Filter from './filter';
import { titleize, numCommonElements } from '../../utils.jsx';

export default class Resources extends Component {
	static convertTagsToSelectValueObject(tags) {
		let newTags = [];
		for (const tag of tags) {
			newTags.push(
				{ value: tag, label: titleize(tag) }
			);
		}
		const sortedTags = newTags.sort((a, b) => a.value > b.value);
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

		if(this.state.sortBy === 'type'){
			aVal = this.typeScore[aVal] || 1;
			bVal = this.typeScore[bVal] || 1;
		}
		else if(this.state.sortBy === 'availability'){
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

		//initialize vars
		let tags = this.props.tags;
		if (!this.props.tags) {
			tags = Resources.allResourcesTags(this.props.research);
		}
		this.selectableTags = Resources.convertTagsToSelectValueObject(tags);

		let resources = (this.props.research).filter(resource => {
			return numCommonElements(resource.tags, tags) > 0;
		});

		this.state = {
			resources: resources,
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

	render() {
		//filter out un-wanted resources
		const selectedTags = Resources.selectableTagsToArray(this.state.selectedTags);

		let resources = this.state.resources.filter((resource) => {
			let resourceTagIncluded = numCommonElements(resource.tags, selectedTags) > 0;
			return resourceTagIncluded;
		});

		resources.sort(this.sortResources);

		//create components from resources
		let resourceComponents = resources.map((x) =>
			(
				<Resource
					resource={x}
					key={x.id}
				/>
			)
		);

		return (
			<div>
				<Filter
					research={this.state.resources}
					handleFormFieldChange={this.handleFormFieldChange}
					selectedTags={this.inputFilters.selectedTags}
					allTags={this.selectableTags}
					filterSubmitted={this.submitFilters}
					count={resources.length}
				/>
				{resourceComponents}
			</div>
		);
	}
}
