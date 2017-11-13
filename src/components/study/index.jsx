import React, { Component } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import style from './style.css';
import styled from 'styled-components';

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
		console.log(style)
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

		const title = (<a href={`${study.url}`}>{Study.titleize(study.title)}</a>);
		const subtitle = `${study.year} - ${Study.titleize(study.availability)} - ${studyType} ${pdf} - ${tags}`
		const StyledCard = styled(Card) `
		width:80%;
		margin:5px auto;
`;
		return (
			<div className={style.home}>
				<StyledCard >
					<CardHeader
						title={title}
						subtitle={subtitle}
					/>
					<CardText>
						<blockquote>{study.quote}</blockquote>
					</CardText>
				</StyledCard>
			</div>
		);
	}
}
