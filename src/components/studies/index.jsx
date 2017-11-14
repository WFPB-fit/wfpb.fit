import React, { Component } from 'react';
import Study from '../study/index.jsx';
import Filter from './filter';
import titleize from '../../utils/titleize';

export default class Studies extends Component {
	static convertTagsToSelectValueObject(tags) {
		let newTags = [];
		for (const tag of tags) {
			newTags.push(
				{ value: tag, label: titleize(tag) }
			);
		}
		return newTags;
	}

	static selectableTagsToArray(selectable) {
		let tags = [];
		for (const option of selectable) {
			tags.push(option.value);
		}
		return tags;
	}

	static numCommonElements(arr1, arr2) {
		const intersect = arr1.filter(x => arr2.includes(x));//[...set1].filter(x=> set2.has(x));
		return intersect.length;
	}

	// static getAllSelectableTags(studies) {
	// 	let uniqueTags = new Set();
	// 	for (const study of studies) {
	// 		for (const tag of study.tags) {
	// 			uniqueTags.add(tag);
	// 		}
	// 	}
	// 	let tags = [];
	// 	for (const tag of uniqueTags) {
	// 		tags.push(
	// 			{ value: tag, label: titleize(tag) }
	// 		);
	// 	}
	// 	return tags;
	// }

	submitFilters() {
		let stateCopy = Object.assign({}, this.state);
		const newState = Object.assign(stateCopy, this.inputFilters);
		console.log(this.inputFilters)
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
		// this.filterStudy = this.filterStudy.bind(this);

		//initialize vars
		let studies = (this.props.research).filter(study => {
			return Studies.numCommonElements(study.tags, props.tags) > 0;
		});

		this.selectableTags = Studies.convertTagsToSelectValueObject(this.props.tags);//Studies.getAllSelectableTags(studies);
		this.state = {
			studies: studies,
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
		//filter out un-wanted studies
		const selectedTags = Studies.selectableTagsToArray(this.state.selectedTags);
		let studies = this.state.studies.filter((study) => {
			let studyTagIncluded = Studies.numCommonElements(study.tags, selectedTags) > 0;
			const properYear = study.year <= this.state.maxYear && study.year >= this.state.minYear;
			return studyTagIncluded && properYear;
		});
		//sort studies by strength
		const studyTypeScore = {
			'report': 3,
			'meta': 2
		}
		studies.sort((a, b) => {
			const aVal = studyTypeScore[a.type] || 1;
			const bVal = studyTypeScore[b.type] || 1;
			return bVal - aVal || b.year - a.year;
		});
		//create components from studies
		let studyComponents = studies.map((x) =>
			(
				<Study
					study={x}
					key={x.id}
				/>
			)
		);

		return (
			<div>
				<Filter
					research={this.state.studies}
					minYear={this.inputFilters.minYear}
					maxYear={this.inputFilters.maxYear}
					selectedTags={this.inputFilters.selectedTags}
					handleMinYearChange={this.handleMinYearChange}
					handleMaxYearChange={this.handleMaxYearChange}
					handleSelectChange={this.handleSelectChange}
					allTags={this.selectableTags}
					filterSubmitted={this.submitFilters}
				/>
				{studyComponents}
			</div>
		);
	}
}
