import React, { Component } from 'react';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

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
	constructor(props) {
		super(props);
		this.handleExpandClick = this.handleExpandClick.bind(this);

		this.state = {
			expanded: false
		}
	}

	handleExpandClick = () => {
		this.setState({ expanded: !this.state.expanded });
	};

	render() {
		const resource = this.props.resource;
		const pdf = getLink(resource.pdf, "PDF");
		const availability = getTitleized(resource.availability);
		const type = getTitleized(resource.type);
		const tags = Resource.getTags(resource.tags);
		const rating = Resource.getRating(resource.rating);
		const title = getLink(resource.url, titleize(resource.title || '')) || titleize(resource.name);
		const books = getLink(resource.books, "Books");
		const website = getLink(resource.website);

		const metaData = joinMetaData([resource.year, books, website, rating, availability, type, pdf, tags]);

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

						height: "500px;"
					}}
					actAsExpander
				>
					<img src={resource.profile_img} alt="Profile Image" />
				</CardMedia>
			);
		}

		return (
			<StyledCard >
				{DisplayCardMedia}
				<Typography type="headline" component="h2">{title}</Typography>
				<Typography type="headline" component="h4">{metaData}</Typography>


				<IconButton
					onClick={this.handleExpandClick}
					aria-expanded={this.state.expanded}
					aria-label="Show more"
				>
					<ExpandMoreIcon />
				</IconButton>

				<div>
					{resource.quote || resource.summary}
					{video}
				</div>

			</StyledCard>
		);
	}
}
