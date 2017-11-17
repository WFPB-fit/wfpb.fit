import React, { Component } from 'react';
import Resource from '../resource/index.jsx';
import Filter from './filter';
import {titleize,numCommonElements} from '../../utils.jsx';

export default class Resources extends Component {
	static convertTagsToSelectValueObject(tags) {
		let newTags = [];
		for (const tag of tags) {
			newTags.push(
				{ value: tag, label: titleize(tag) }
			);
		}
		const sortedTags = newTags.sort((a,b)=> a.value > b.value);
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

	handleMinYearChange(event) {
		this.inputFilters.minYear = parseInt(event.target.value, 10);
	}
	handleMaxYearChange(event) {
		this.inputFilters.maxYear = parseInt(event.target.value, 10);
	}

	handleSelectChange(value) {
		this.inputFilters.selectedTags = value;
	}

	constructor(props) {
		super(props);

		//bind this
		this.submitFilters = this.submitFilters.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleMinYearChange = this.handleMinYearChange.bind(this);
		this.handleMaxYearChange = this.handleMaxYearChange.bind(this);

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
			minYear: 1900,
			maxYear: (new Date()).getFullYear()
		};
		this.inputFilters = {
			selectedTags: this.state.selectedTags,
			minYear: this.state.minYear,
			maxYear: this.state.maxYear
		};
	}

	render() {
		//filter out un-wanted resources
		const selectedTags = Resources.selectableTagsToArray(this.state.selectedTags);
		let resources = this.state.resources.filter((resource) => {
			let resourceTagIncluded = numCommonElements(resource.tags, selectedTags) > 0;
			const properYear = !resource.year || (resource.year <= this.state.maxYear && resource.year >= this.state.minYear);
			return resourceTagIncluded && properYear;
		});

		//sort resources by strength
		const resourceTypeScore = {
			'research report': 3,
			'meta analysis': 2,
			'study':1,
			'article':0
		}
		resources.sort((a, b) => {
			const aVal = resourceTypeScore[a.type] || 1;
			const bVal = resourceTypeScore[b.type] || 1;
			return bVal - aVal || b.year - a.year;
		});
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
					minYear={this.inputFilters.minYear}
					maxYear={this.inputFilters.maxYear}
					selectedTags={this.inputFilters.selectedTags}
					handleMinYearChange={this.handleMinYearChange}
					handleMaxYearChange={this.handleMaxYearChange}
					handleSelectChange={this.handleSelectChange}
					allTags={this.selectableTags}
					filterSubmitted={this.submitFilters}
					count={resources.length}
				/>
				{resourceComponents}
			</div>
		);
	}
}
