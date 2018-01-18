import React, { Component } from 'react';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import HelpIcon from 'material-ui-icons/Help';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Dialog, {
	// DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
  } from 'material-ui/Dialog';
  
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
		this.learnMoreClick = this.learnMoreClick.bind(this);
		this.handleDialogClose = this.handleDialogClose.bind(this);

		this.state = {
			expanded: false
		}
	}

	learnMoreClick() {
		this.setState({ expanded: !this.state.expanded });
	}
	handleDialogClose() {
		this.setState({ expanded: false });
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
						height: 300
					}}
					image={resource.profile_img}
				/>
			);
		}

		const RotateIcon = styled(IconButton) `transform:rotate(${(this.state.expanded) ? 180 : 0}deg);`
		let ExpandIcon = (
			<RotateIcon
				onClick={this.learnMoreClick}
				aria-expanded={this.state.expanded}
				aria-label="Show more"
			>
				<HelpIcon />
			</RotateIcon>
		);
		if (!isMediaCard) ExpandIcon = null;

		let CardInfo = (
			<div>
				{resource.quote || resource.summary}
				{video}
			</div>
		);
		if (isMediaCard) {
			CardInfo = (
				<Dialog
					open={this.state.expanded}
					onClose={this.handleDialogClose}
				>
					<DialogTitle>{title}</DialogTitle>
					<DialogContent>
						{/* <DialogActions></DialogActions> */}
						<DialogContentText> {resource.quote || resource.summary}</DialogContentText>
					</DialogContent>
				</Dialog>
			);
		}

		return (
			<StyledCard >
				{DisplayCardMedia}
				<Typography type="headline" component="h2">{title}</Typography>
				<Typography type="headline" component="h4">{metaData}</Typography>

				{ExpandIcon}
				{CardInfo}

			</StyledCard>
		);
	}
}
