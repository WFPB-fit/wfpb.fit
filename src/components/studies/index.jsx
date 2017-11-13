import { h, Component } from 'preact';
// import style from './style';
import Study from '../study/index.jsx';
import FilterTable from '../filterTable/index.jsx';

export default class Studies extends Component {
	static preprocessStudies(studies) {
		return studies.map((study, indx) => {
			let tags = study.tags;
			study.tags = tags.split(',');
			study.id = indx;
			return study;
		});
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

	render() {
		let studies = Studies.preprocessStudies(this.props.research);
		const approvedTags = Studies.getAllTags(studies);
		let studyComponents = studies.reduce((allStudies, study) => {
			//filter out un-approved studies
			for (const tag of study.tags) {
				if (approvedTags.includes(tag)) {
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
				<FilterTable
					research={studies}
					tags={approvedTags}
				/>
				{studyComponents}
			</div>
		);
	}
}
