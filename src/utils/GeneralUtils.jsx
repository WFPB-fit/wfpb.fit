import React from 'react';
import styled from 'styled-components';


export function preprocess(resources) {
	return resources.map((resource, indx) => {
		if (resource.tags) resource.tags = resource.tags.split(',');
		resource.id = indx;

		return resource;
	});
}

export function indexByTags(resources) {
	let indx = {};
	for (const resource of resources) {
		const tags = resource.tags;
		for (const tag of tags) { //add indexed resource under each tags index
			let arr = indx[tag] || [];
			arr.push(resource);
			indx[tag] = arr;
		}
	}
	return indx;
}

export function titleize(string) {
	let arr = string.split(' ');
	arr = arr.map(capitalize);
	return arr.join(' ');
}

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getRandomColor() { //https://stackoverflow.com/questions/1484506/random-color-generator
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

export function numCommonElements(arr1, arr2) {
	const intersect = arr1.filter(x => arr2.includes(x)); //[...set1].filter(x=> set2.has(x));
	return intersect.length;
}
export function alphaCompare(a, b) {
	if (a.value && b.value) return a.value.localeCompare(b.value);
	else return a.localeCompare(b);
}
export function getLink(url, text) {
	if (!url || url === '') return null;

	if (!text || text === '') {
		const urlObj = new URL(url);
		text = urlObj.hostname.replace('www.', '');
	}
	return <a href={url}>{text}</a>;
}
export function joinMetaData(arr) {
	const realData = arr.filter((el) => el);//filter out falsy values like null
	if (realData.length > 0) {
		return realData.map((t, i) => <span key={i} >{t}</span>) //wrap everything in a span
			.reduce((prev, curr) => [prev, ' - ', curr]); //add delimiter
	} else {
		return '';
	}
}

export function getTitleized(val) {
	return (val) ? titleize(val) : null;
}

export function filterStudiesByTags(raw, allowed) { //https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6
	return Object.keys(raw)
		.filter(key => allowed.includes(key))
		.reduce((obj, key) => {
			obj[key] = raw[key];
			return obj;
		}, {});
	// return studies.filter(resource => {
	// 	return numCommonElements(resource.tags, tags) > 0;
	// });
}

export let CenteredDiv = styled.div`
width:95%;
@media (min-width: 700px) {
	width:80%;
}
margin:0 auto;
max-width:1000px;

& p,h3 {
	text-align:center;
}
`;
