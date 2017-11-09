import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import style from './style';

export default class Study extends Component {
	static titleize(string) {
		let arr = string.split(' ');
		arr = arr.map(Study.capitalize);
		return arr.join(' ');
	}
	static capitalize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	render() {
		const study = this.props.study;

		let pdf = '';
		if (study.pdf) {
			pdf = `- <a href=${study.url}>PDF</a>`;
		}
		let studyType = 'Study';
		if (study.is_meta) {
			studyType = `Meta Analysis`;
		}
		let tags = study.tags.join(', ');
		tags = Study.titleize(tags);

		return (
			<div class={style.home}>
				<Card>
					<Card.Primary>
						<Card.Title><a href={`${study.url}`}>{Study.titleize(study.title)}</a></Card.Title>
						<Card.Subtitle>{study.year} - {Study.titleize(study.availability)} - {studyType} {pdf} - {tags}</Card.Subtitle>
					</Card.Primary>
					<Card.SupportingText>
						<blockquote>{study.quote}</blockquote>
					</Card.SupportingText>
				</Card>
			</div>
		);
	}
}
