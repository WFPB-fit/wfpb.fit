import { h, Component } from 'preact';
import style from './style';
import Study from '../../components/study/index.jsx';

import health from '../../assets/data/health.json';

export default class Home extends Component {
	static preprocessStudies(studies) {
		return studies.map((study) => {
			let tags = study.tags;
			study.tags = tags.split(',');
			return study;
		});
	}
	render() {
		let studies = Home.preprocessStudies(health);
		let studyComponents = studies.map((research) =>
			<Study study={research} />
		);

		return (
			<div class={style.home}>
				{studyComponents}
			</div>
		);
	}
}
