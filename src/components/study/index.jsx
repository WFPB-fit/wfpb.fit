import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import titleize from 'titleize';

export default class Study extends Component {
	render() {
		const study = this.props.study;

		let pdf = '';
		if (study.pdf){
			pdf = `- <a href=${study.url}>PDF</a>`;
		}
		let study_type = 'Study';
		if (study.is_meta){
			study_type = `Meta Analysis`;
		}
		let tags = study.tags.split(',').join(', ');
		tags = titleize(tags);

		return (
			<div class={style.home}>
				<Card>
					<Card.Primary>
						<Card.Title><a href={`${study.url}`}>{titleize(study.title)}</a></Card.Title>
						<Card.Subtitle>{study.year} - {titleize(study.availability)} - {study_type} {pdf} - {tags}</Card.Subtitle>
					</Card.Primary>
					<Card.SupportingText>
						<blockquote>{study.quote}</blockquote>
					</Card.SupportingText>
				</Card>
			</div>
		);
	}
}
