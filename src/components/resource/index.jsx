import React, { Component } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import styled from 'styled-components';
import { titleize, getLink, joinMetaData, getTitleized } from '../../utils/GeneralUtils.jsx';

export default class Resource extends Component {
	static youtubeID(url) {
		if (!url || url.indexOf('youtube.com') < 0) {
			return null;
		}
		let vIndex = url.indexOf('v=');
		return url.substring(vIndex + 2);
	}
	static vimeoID(url) {
		if (!url || url.indexOf('vimeo.com') < 0) {
			return null;
		}
		let vIndex = url.lastIndexOf('/');
		return url.substring(vIndex + 1);
	}
	static getRating(rating) {
		if (rating && rating > 5 && rating <= 10) {
			rating = `${rating} / 10`
		}
		else if (rating && rating < 5) {
			rating = `${rating} / 5`
		}
		return rating;
	}
	static getEmbeddedVideoCode(url) {
		const StyledFrame = styled.iframe`
		width:100%;
		max-width:420px;
		height:240px;
		display:block;
		margin:5px auto;
		`;
		const youtubeId = Resource.youtubeID(url);
		const vimeoId = Resource.vimeoID(url);

		if (youtubeId) {
			return <StyledFrame src={`https://www.youtube.com/embed/${youtubeId}`} />
		} else if (vimeoId) {
			return <StyledFrame src={`https://player.vimeo.com/video/${vimeoId}`} />
		} else {
			return null;
		}
	}
	static getTags(tags) {
		return (tags) ? titleize(tags.join(', ')) : null;
	}
	render() {
		const resource = this.props.resource;
		const pdf = getLink(resource.pdf, "PDF");
		const availability = getTitleized(resource.availability);
		const type = getTitleized(resource.type);
		const tags = Resource.getTags(resource.tags);
		const rating = Resource.getRating(resource.rating);
		const title = getLink(resource.url, titleize(resource.title || '')) || titleize(resource.name);
		const books = getLink(resource.books, "Books");
		const website = getLink(resource.website, "Website");

		const metaData = joinMetaData([resource.year, books, website, rating, availability, type, pdf, tags]);

		const video = Resource.getEmbeddedVideoCode(resource.url);
		const StyledCard = styled(Card) `
		margin:5px auto;
		`;
		return (
			<StyledCard >
				<CardHeader
					title={title}
					subtitle={metaData}
				/>
				<CardText>
					{resource.quote || resource.summary}
					{video}
				</CardText>
			</StyledCard>
		);
	}
}
