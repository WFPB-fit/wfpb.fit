import React, { Component } from 'react';
import Study from '../study/index.jsx';
import Filter from './filter';
import titleize from '../../utils/titleize';

export default class Studies extends Component {
	static preprocessStudies(studies) {
		return studies.map((study, indx) => {
			let tags = study.tags;
			study.tags = tags.split(',');
			study.id = indx;
			return study;
		});
	}

	// static convertTagsToSelectValueObject(tags) {
	// 	let newTags = [];
	// 	for (const tag of tags) {
	// 		newTags.push(
	// 			{ value: tag, label: titleize(tag) }
	// 		);
	// 	}
	// 	return newTags;
	// }
	static selectableTagsToArray(selectable) {
		let tags = [];
		for (const option of selectable) {
			tags.push(option.value);
		}
		return tags;
	}

	static getAllSelectableTags(studies) {
		let uniqueTags = new Set();
		for (const study of studies) {
			for (const tag of study.tags) {
				uniqueTags.add(tag);
			}
		}
		let tags = [];
		for (const tag of uniqueTags) {
			tags.push(
				{ value: tag, label: titleize(tag) }
			);
		}
		return tags;
	}

	submitFilters() {
		let stateCopy = Object.assign({}, this.state);
		const newState = Object.assign(stateCopy, this.inputFilters);
		console.log(this.inputFilters)
		this.setState(newState);
	}

	handleMinYearChange(event) {
		this.inputFilters.minYear = parseInt(event.target.value,10);
	}
	handleMaxYearChange(event) {
		this.inputFilters.maxYear = parseInt(event.target.value,10);
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
		let studies = Studies.preprocessStudies(this.props.research);
		this.selectableTags = Studies.getAllSelectableTags(studies);
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
			let studyTagIncluded = false;
			for (const tag of study.tags) {
				studyTagIncluded = selectedTags.includes(tag);
				if (studyTagIncluded) break;
			}
			const properYear = study.year <= this.state.maxYear && study.year >= this.state.minYear;
			return studyTagIncluded && properYear;
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
