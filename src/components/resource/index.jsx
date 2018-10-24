import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import styled from "styled-components";

import {
	titleize,
	joinMetaData,
	getTitleized
} from "../../utils/GeneralUtils.jsx";
import Help from "../help";
import Quote from "../quote";

import StudyMetadataNames from '../../assets/data/study_metadata_names.json';

import CircularProgress from "@material-ui/core/CircularProgress";

export default class Resource extends Component {
	static youtubeID(url) {
		if (!url || url.indexOf("youtube.com") < 0) {
			return null;
		}
		let vIndex = url.indexOf("v=");
		return url.substring(vIndex + 2);
	}
	static vimeoID(url) {
		if (!url || url.indexOf("vimeo.com") < 0) {
			return null;
		}
		let vIndex = url.lastIndexOf("/");
		return url.substring(vIndex + 1);
	}
	static getRating(rating) {
		if (rating && rating > 5 && rating <= 10) {
			rating = `${rating} / 10`;
		} else if (rating && rating < 5) {
			rating = `${rating} / 5`;
		}
		return rating;
	}
	static getEmbeddedVideoCode(url) {
		const StyledFrame = styled.iframe`
			width: 100%;
			max-width: 420px;
			height: 240px;
			display: block;
			margin: 5px auto;
		`;
		const youtubeId = Resource.youtubeID(url);
		const vimeoId = Resource.vimeoID(url);

		if (youtubeId) {
			return <StyledFrame src={`https://www.youtube.com/embed/${youtubeId}`} />;
		} else if (vimeoId) {
			return <StyledFrame src={`https://player.vimeo.com/video/${vimeoId}`} />;
		} else {
			return null;
		}
	}
	static getTags(tags) {
		return tags ? titleize(tags.join(", ")) : null;
	}

	render() {
		const resource = this.props.resource;

		const availability = getTitleized(StudyMetadataNames.availability[resource.availability]);
		const type = getTitleized(StudyMetadataNames.types[resource.type]);
		const tags = Resource.getTags(resource.tags);
		const rating = Resource.getRating(resource.rating);
		const title = titleize(resource.title || "") || titleize(resource.name);

		const metaData = joinMetaData([
			resource.year,
			rating,
			availability,
			type,
			tags
		]);

		const video = Resource.getEmbeddedVideoCode(resource.video);

		const isMediaCard = resource.profile_img;

		let StyledCard = styled(Card)`
			margin: 5px auto;
			vertical-align: top;
		`;
		let DisplayCardMedia = null;

		if (isMediaCard) {
			StyledCard = styled(StyledCard)`
				max-width: 100%;
				display: inline-block;
				width: 300px;
				margin: 10px;
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
				<Help title={title} content={resource.quote || resource.summary} />
			);
		}

		let CardInfo = null;
		if (!isMediaCard) {
			let txt;
			if (resource.quote) txt = <Quote>{resource.quote}</Quote>;
			else if (resource.summary)
				txt = <Typography>{resource.summary}</Typography>;
			else txt = <CircularProgress />;

			CardInfo = (
				<div>
					{txt}
					{video}
				</div>
			);
		}
		let isGraphic = null;
		if (resource.graphic) {
			isGraphic = (
				<Typography align="center" variant="h6">
					GRAPHIC
				</Typography>
			);
		}

		let buy = resource.buyURL;
		if (resource.amzn) buy = `http://a.co/${resource.amzn}`;
		else if (resource.wmart)
			buy = `https://www.walmart.com/ip/${resource.wmart}`;

		return (
			<StyledCard>
				{DisplayCardMedia}
				<CardContent>
					<Typography align="center" variant="h4">
						{title}
					</Typography>

					{isGraphic}

					<Typography align="center" variant="h6">
						{metaData}
					</Typography>

					{CardInfo}
				</CardContent>

				<CardActions>
					{resource.url && (
						<Button
							size="small"
							variant="contained"
							color="primary"
							target="_blank"
							href={resource.url}
						>
							Source
						</Button>
					)}
					{buy && (
						<Button
							size="small"
							variant="contained"
							color="primary"
							target="_blank"
							href={buy}
						>
							Buy
						</Button>
					)}
					{resource.website && (
						<Button
							size="small"
							variant="contained"
							color="primary"
							target="_blank"
							href={resource.website}
						>
							Website
							{/* {new URL(resource.website).hostname.replace("www.", "")} */}
						</Button>
					)}

					{resource.pdf && (
						<Button
							size="small"
							color="primary"
							target="_blank"
							href={resource.pdf}
						>
							PDF
						</Button>
					)}
					{resource.books && (
						<Button
							size="small"
							color="primary"
							target="_blank"
							href={resource.books}
						>
							Books
						</Button>
					)}

					{ExpandIcon}
				</CardActions>
			</StyledCard>
		);
	}
}
