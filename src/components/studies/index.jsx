import { h, Component } from 'preact';
// import style from './style';
import Study from '../study/index.jsx';

export default class Studies extends Component {
	static preprocessStudies(studies) {
		return studies.map((study) => {
			let tags = study.tags;
			study.tags = tags.split(',');
			return study;
		});
	}
	render() {
		let studies = Studies.preprocessStudies(this.props.studies);
		let studyComponents = studies.map((research, indx) =>
			(
				<Study
					study={research}
					key={indx}
				/>
			)
		);

		return (
			<div>
				{studyComponents}
			</div>
		);
	}
}
