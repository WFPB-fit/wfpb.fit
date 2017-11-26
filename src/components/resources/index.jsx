import React, { Component } from 'react';
import Resource from '../resource/index.jsx';
import Filter from './filter';
import { titleize } from '../../utils/GeneralUtils.jsx';

export default class Resources extends Component {
	static convertTagsToSelectValueObject(tags) {
		let newTags = tags.map((tag) =>{
			return { value: tag, label: titleize(tag) };
		});
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

	handleSelectedTagsChanged(value){
		this.setState({ selectedTags: value });
	}
	handleSortByChanged(event,index,sortLabel){
		this.setState({ sortBy: sortLabel });
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
		this.sortResources = this.sortResources.bind(this);
		this.getStudiesFromSelectedTags = this.getStudiesFromSelectedTags.bind(this);
		this.handleSelectedTagsChanged = this.handleSelectedTagsChanged.bind(this);
		this.handleSortByChanged = this.handleSortByChanged.bind(this);

		//initialize vars
		let tags = this.props.tags;
		if (!this.props.tags) {
			tags = Resources.allResourcesTags(this.props.research);
		}
		this.selectableTags = Resources.convertTagsToSelectValueObject(tags);

		this.state = {
			resources: this.props.research,
			selectedTags: [],
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
				<Filter
					selectedTags={this.state.selectedTags}
					sortBy={this.state.sortBy}
					allTags={this.selectableTags}
					selectedTagsChanged={this.handleSelectedTagsChanged}
					sortByChanged={this.handleSortByChanged}
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
