import React, { Component } from 'react';
import tags from '../assets/data/tags.json';
import { WidthWrapper,indexByTags } from '../utils/GeneralUtils.jsx';
import ResourceTabs from '../components/tabsDisplay/ResourceTabs.jsx';

import CircularProgress from '@material-ui/core/CircularProgress';


export default class Research extends Component {

	static filterStudiesByTags(raw, allowed) { //https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6
		return Object.keys(raw)
			.filter(key => allowed.includes(key))
			.reduce((obj, key) => {
				obj[key] = raw[key];
				return obj;
			}, {});
	}

	static mergeStudiesText(studies,text_data){
		for (let i=0;i<studies.length;i++){
			studies[i] = Object.assign({},studies[i],text_data[studies[i].id])
		}
	}

	render() {
		if (this.props.studies_metadata) {
			let md = this.props.studies_metadata;
			let txt = this.props.studies_text;

			if (txt){
				Research.mergeStudiesText(md, txt);
			}

			md = indexByTags(md);
			let disease_studies = Research.filterStudiesByTags(md, tags.disease);
			let food_studies = Research.filterStudiesByTags(md, tags.food);
			let nutrient_studies = Research.filterStudiesByTags(md, tags.nutrients);
			let environment_studies = Research.filterStudiesByTags(md, tags.environment);
			let agribusiness_studies = Research.filterStudiesByTags(md, tags.agribusiness);
			// let animals_studies = Research.filterStudiesByTags(md, []);

			let tabs = [{
				label: 'Disease',
				tags: tags.disease,
				resources: disease_studies
			}, {
				label: 'Food',
				tags: tags.food,
				resources: food_studies
			}, {
				label: 'Nutrients',
				tags: tags.nutrients,
				resources: nutrient_studies
			}, {
				label: 'Environment',
				tags: tags.environment,
				resources: environment_studies
			}, {
				label: 'Agribusiness',
				tags: tags.agribusiness,
				resources: agribusiness_studies
			},
			//  {
			// 	label: 'Animals',
			// 	tags: [],
			// 	resources: animals_studies
			// }
			];

			return (
				<WidthWrapper>
					<ResourceTabs
						tabs={tabs}
						location={this.props.location}
						history={this.props.history}
					/>
				</WidthWrapper>
			);
		} else {
			return (
				<WidthWrapper>
					<CircularProgress />
				</WidthWrapper>
			);
		}
	}
}
