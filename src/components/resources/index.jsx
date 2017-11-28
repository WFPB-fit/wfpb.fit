import React, { Component } from 'react';
import Resource from '../resource/index.jsx';
import Filter from './filter';
import { titleize } from '../../utils/GeneralUtils.jsx';

export default class Resources extends Component {
	handleSelectedTagsChanged(value) {
		this.setState({ selectedTags: value });

		//update URL to match the new tags
		const newTags = value.map(selectable => selectable.value);
		const newTagString = (newTags.length > 0) ? `tags=${newTags.join(',')}` : '';
		this.props.history.replace({
			pathname: this.props.match.url,
			search: newTagString
		});
	}
	handleSortByChanged(event, index, sortLabel) {
		this.setState({ sortBy: sortLabel });
	}
	static tagsToSelectables(tags) {
		let newTags = tags.map((tag) => {
			return { value: tag, label: titleize(tag) };
		});
		const sortedTags = newTags.sort((a, b) => a.value.localeCompare(b.value));
		return sortedTags;
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
		//init state first
		this.state = {
			selectedTags: [],
			sortBy: 'year'
		};

		//find all selectable tags
		let tags = this.props.tags;
		if (!this.props.tags) {
			tags = Object.keys(this.props.research);
		}
		this.selectableTags = Resources.tagsToSelectables(tags);

		//set initial tags from url params
		const urlTags = (new URLSearchParams(this.props.location.search).get('tags') || '').split(',');
		const realUrlTags = urlTags.filter(t => tags.includes(t));
		const selectableURLTags = Resources.tagsToSelectables(realUrlTags);
		this.state.selectedTags = selectableURLTags;

		//find number of unique resources
		const taggedResources = Object.values(this.props.research);
		const allResearch = Object.values(taggedResources.reduce((total, currResources) => {
			for (const r of currResources) total[r.title] = r;
			return total;
		}, {}));
		this.numTotal = allResearch.length;

		//determine how sorting will work for different Resource values using the following objects
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
				<Filter
					selectedTags={this.state.selectedTags}
					sortBy={this.state.sortBy}
					allTags={this.selectableTags}
					selectedTagsChanged={this.handleSelectedTagsChanged}
					sortByChanged={this.handleSortByChanged}
					numShown={resources.length}
					numTotal={this.numTotal}
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
