import React from "react";
import styled from "styled-components";

import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export function preprocess(resources) {
	return resources.map((resource, indx) => {
		if (resource.tags) resource.tags = resource.tags.split(",");
		resource.id = indx;

		return resource;
	});
}

export function indexByTags(resources) {
	let indx = {};
	for (const resource of resources) {
		const tags = resource.tags;
		for (const tag of tags) {
			//add indexed resource under each tags index
			let arr = indx[tag] || [];
			arr.push(resource);
			indx[tag] = arr;
		}
	}
	return indx;
}

export function titleize(string) {
	let arr = string.split(" ");
	arr = arr.map(capitalize);
	return arr.join(" ");
}

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getRandomColor() {
	//https://stackoverflow.com/questions/1484506/random-color-generator
	var letters = "0123456789ABCDEF";
	var color = "#";
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
export function getNutrientFromId(id, nutrients) {
	const n = nutrients.filter(x => x.nutrient_id === id); //find the nutrient. use '==' as one may be string and other integer
	return n.length === 1 ? n[0] : null;
}
export function numCommonElements(arr1, arr2) {
	const intersect = arr1.filter(x => arr2.includes(x)); //[...set1].filter(x=> set2.has(x));
	return intersect.length;
}
export function alphaCompare(a, b) {
	if (a.label && b.label) return a.label.localeCompare(b.label);
	else if (a.value && b.value) return a.value.localeCompare(b.value);
	else return a.localeCompare(b);
}
export function objSwap(json) {
	var ret = {};
	for (var key in json) {
		ret[json[key]] = key;
	}
	return ret;
}
export function sumValues(obj) {
	return Object.keys(obj).reduce((sum, key) => {
		const val = parseInt(obj[key] || 0, 10);
		return sum + val;
	}, 0);
}
export function getLink(url, text, useHashLink = true, spacePad = true) {
	if (!url || url === "") return null;

	if (!text || text === "") {
		const urlObj = new URL(url);
		text = urlObj.hostname.replace("www.", "");
	}

	const anchor = (
		<a href={url} target="_blank">{text}</a>
	);

	if (url.charAt(0) === "/") {
		const LinkComponent = useHashLink ? HashLink : Link;
		return <LinkComponent to={url}> {text}</LinkComponent>;
	} else if (spacePad) {
		return <span>{" "}{anchor}{" "}</span>;
	} else {
		return anchor;
	}
}
export function joinMetaData(arr) {
	const realData = arr.filter(el => el); //filter out falsy values like null
	if (realData.length > 0) {
		return realData
			.map((t, i) => <span key={i}>{t}</span>) //wrap everything in a span
			.reduce((prev, curr) => [prev, " - ", curr]); //add delimiter
	} else {
		return "";
	}
}

export function getTitleized(val) {
	return val ? titleize(val) : null;
}

export const CenteredCircularProgress = styled(CircularProgress)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const WidthWrapper = styled.div`
	width: 95%;
	@media (min-width: 800px) {
		width: 80%;
	}
	margin: 0 auto;
	max-width: 1000px;

	line-height: 1.4;

	// & p,h3 {
	// 	text-align:center;
	// }
`;
export const VerticalMidAlignWrapper = styled.div`
	display: flex;
	align-items: center;
`;
