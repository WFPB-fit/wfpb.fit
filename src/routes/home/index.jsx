import { h, Component } from 'preact';
import style from './style';
import Study from '../../components/study/index.jsx';

import health from '../../assets/data/health.json';

export default class Home extends Component {
	render() {
		let studies = health.map((research) =>
			<Study study={research} />
		);

		return (
			<div class={style.home}>
				{studies}
			</div>
		);
	}
}
