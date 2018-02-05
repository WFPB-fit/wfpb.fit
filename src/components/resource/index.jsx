import React, { Component } from 'react';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import styled from 'styled-components';

import { titleize, getLink, joinMetaData, getTitleized } from '../../utils/GeneralUtils.jsx';
import Help from '../help';

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
	constructor(props) {
		super(props);
	}

	render() {
		const resource = this.props.resource;

		const availability = getTitleized(resource.availability);
		const type = getTitleized(resource.type);
		const tags = Resource.getTags(resource.tags);
		const rating = Resource.getRating(resource.rating);
		const title = titleize(resource.title || '') || titleize(resource.name);

		const metaData = joinMetaData([resource.year, rating, availability, type, tags]);

		const video = Resource.getEmbeddedVideoCode(resource.url);

		const isMediaCard = resource.profile_img;

		let StyledCard = styled(Card) `
		margin:5px auto;
		vertical-align: top;
		`;
		let DisplayCardMedia = null;
		let isExpandable = false;

		if (isMediaCard) {
			isExpandable = true;
			StyledCard = styled(StyledCard) `
			max-width:100%;
			display:inline-block;
			width:300px;
			margin:10px;
			`;
			DisplayCardMedia = (
				<CardMedia
					style={{
						height: 300
					}}
					image={resource.profile_img}
				/>
			);
		}

		let ExpandIcon = null;
		if (isMediaCard) {
			ExpandIcon = (
				<Help
					title={title}
					content={resource.quote || resource.summary}
				/>
			)
		}

		let CardInfo = null;
		if (!isMediaCard) {
			CardInfo = (
				<div>
					{resource.quote || resource.summary}
					{video}
				</div>
			);
		}

		return (
			<StyledCard >
				{DisplayCardMedia}
				<CardContent>
					<Typography type="title">{title}</Typography>
					<Typography type="subheading">{metaData}</Typography>

					{ExpandIcon}
					
					<Typography type="body1">{CardInfo}</Typography>
				</CardContent>

				<CardActions>
					{resource.pdf &&
						<Button size="small" color="primary" href={resource.pdf}>
							PDF
					 	</Button>
					}
					{resource.url &&
						<Button size="small" color="primary" href={resource.url}>
							Source
					 	</Button>
					}
					{resource.books &&
						<Button size="small" color="primary" href={resource.books}>
							Books
					 	</Button>
					}
					{resource.website &&
						<Button size="small" color="primary" href={resource.website}>
							Website
					 	</Button>
					}
				</CardActions>
			</StyledCard>
		);
	}
}
