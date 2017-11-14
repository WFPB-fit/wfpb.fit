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

	static convertTagsToSelectValueObject(tags) {
		let newTags = [];
		for (const tag of tags) {
			newTags.push(
				{ value: tag, label: titleize(tag) }
			);
		}
		return newTags;
	}

	static getAllTags(studies) {
		let tags = new Set();
		for (const study of studies) {
			for (const tag of study.tags) {
				tags.add(tag);
			}
		}
		return Array.from(tags);
	}

	constructor(props) {
		super(props);

		//bind this
		this.filter = this.filter.bind(this);

		//initialize vars
		let studies = Studies.preprocessStudies(this.props.research);
		const allTagsArray = Studies.getAllTags(studies);
		const selectedTags = Studies.convertTagsToSelectValueObject(allTagsArray);
		this.state = {
			studies:studies,
			allTagsArray:allTagsArray,
			selectedTags:selectedTags,
			minYear: 1900,
			maxYear: (new Date()).getFullYear()
		};
	}

	render() {
		let studyComponents = this.state.studies.reduce((allStudies, study) => {
			//filter out un-approved studies
			for (const tag of study.tags) {
				if (this.state.allTagsArray.includes(tag)) {
					allStudies.push(
						<Study
							study={study}
							key={study.id}
						/>
					);
					break;
				}
			}
			return allStudies;
		}, []);

		return (
			<div>
				<Filter
					research={this.state.studies}
					minYear={this.state.minYear}
					maxYear={this.state.maxYear}
					selectedTags={this.state.selectedTags}
					allTags={this.state.selectedTags}
					filterSubmitted={this.filter}
				/>
				{studyComponents}
			</div>
		);
	}
}
