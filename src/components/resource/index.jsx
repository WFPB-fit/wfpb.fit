import React, { Component } from 'react';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import styled from 'styled-components';

import { titleize, getLink, joinMetaData, getTitleized } from '../../utils/GeneralUtils.jsx';
import Help from '../help';
import Quote from '../quote';

import Availabilities from '../../assets/data/preprocessed_data/study_availability.json';
import StudyTypes from '../../assets/data/preprocessed_data/study_types.json';

// import CircularProgress from 'material-ui/core/CircularProgress';


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

		const availability = getTitleized(Availabilities[resource.availability]);
		const type = getTitleized(StudyTypes[resource.type]);
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
			let txt;
			if (resource.quote) txt = <Quote>{resource.quote}</Quote>;
			else if (resource.summary) txt = <Typography variant="body1">{resource.summary}</Typography>;

			CardInfo = (
				<div>
					{txt}
					{video}
				</div>
			);
		}

		let buy = resource.buyURL;
		if (resource.amzn) buy = `http://a.co/${resource.amzn}`
		else if (resource.wmart) buy = `https://www.walmart.com/ip/${resource.wmart}`

		return (
			<StyledCard >
				{DisplayCardMedia}
				<CardContent>
					<Typography align="center" variant="headline">{title}</Typography>
					<Typography align="center" variant="subheading">{metaData}</Typography>

					{CardInfo}
				</CardContent>

				<CardActions>
					{resource.url &&
						<Button size="small" variant="raised" color="primary" target="_blank" href={resource.url}>
							Source
					 	</Button>
					}
					{buy &&
						<Button size="small" variant="raised" color="primary" target="_blank" href={buy}>
							Buy
				 		</Button>
					}
					{resource.website &&
						<Button size="small" variant="raised" color="primary" target="_blank" href={resource.website}>
							{new URL(resource.website).hostname.replace("www.", "")}
						</Button>
					}

					{resource.pdf &&
						<Button size="small" color="primary" target="_blank" href={resource.pdf}>
							PDF
					 	</Button>
					}
					{resource.books &&
						<Button size="small" color="primary" target="_blank" href={resource.books}>
							Books
					 	</Button>
					}

					{ExpandIcon}
				</CardActions>
			</StyledCard>
		);
	}
}
