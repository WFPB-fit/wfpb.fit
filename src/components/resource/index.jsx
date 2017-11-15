import React, { Component } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import styled from 'styled-components';
import titleize from '../../utils/titleize'

export default class Resource extends Component {
	static getPdf(resource) {
		let pdf = null;
		if (resource.pdf) pdf = <a href={resource.pdf}>PDF</a>;
		return pdf;
	}
	static youtubeID(url) {
		let vIndex = url.indexOf('v=');
		return url.substring(vIndex + 2);
	}
	static getAvailability(resource) {
		let av = null;
		if (resource.availability) av = titleize(resource.availability);
		return av;
	}
	static getType(resource) {
		let type = null;
		if (resource.type) type = titleize(resource.type);
		return type;
	}
	static getRating(resource) {
		let rating = resource.rating;
		if (rating && rating > 5 && rating <= 10) {
			rating = `${resource.rating} / 10`
		}
		else if (rating && rating < 5) {
			rating = `${resource.rating} / 5`
		}
		return rating;
	}
	static getEmbeddedYoutubeCode(url) {
		if (url.indexOf('youtube.com') < 0) {
			return null;
		}
		// const id = Resource.youtubeID(url);
		// const StyledFrame = styled.iframe`
		// width:100%;
		// max-width:420px;
		// height:240px;
		// display:block;
		// margin:5px auto;
		// `;
		// return <StyledFrame src={`https://www.youtube.com/embed/${id}`} />
		return null;
	}
	static getTags(resource) {
		return titleize(resource.tags.join(', '));
	}
	render() {
		const resource = this.props.resource;
		const pdf = Resource.getPdf(resource);
		const availability = Resource.getAvailability(resource);
		const type = Resource.getType(resource);
		const tags = Resource.getTags(resource);
		const rating = Resource.getRating(resource);
		const title = (<a href={`${resource.url}`}>{titleize(resource.title)}</a>);
		const metaData = [resource.year, rating, availability, type, pdf, tags]
			.filter((el) => el) //filter out falsy values like null
			.map((t, i) => <span key={i} >{t}</span>) //wrap everything in a span
			.reduce((prev, curr) => [prev, ' - ', curr]); //add delimiter

		const youtubeCode = Resource.getEmbeddedYoutubeCode(resource.url);
		const StyledCard = styled(Card) `
		width:80%;
		margin:5px auto;
		`;
		return (
			<StyledCard >
				<CardHeader
					title={title}
					subtitle={metaData}
				/>
				<CardText>
					<blockquote>{resource.quote || resource.summary}</blockquote>
					{youtubeCode}
				</CardText>
			</StyledCard>
		);
	}
}
