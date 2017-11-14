import React, { Component } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import styled from 'styled-components';
import titleize from '../../utils/titleize'

export default class Study extends Component {
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
		tags = titleize(tags);

		const title = (<a href={`${study.url}`}>{titleize(study.title)}</a>);
		const subtitle = `${study.year} - ${titleize(study.availability)} - ${studyType} ${pdf} - ${tags}`
		const StyledCard = styled(Card) `
		width:80%;
		margin:5px auto;
`;
		return (
			<StyledCard >
				<CardHeader
					title={title}
					subtitle={subtitle}
				/>
				<CardText>
					<blockquote>{study.quote}</blockquote>
				</CardText>
			</StyledCard>
		);
	}
}
