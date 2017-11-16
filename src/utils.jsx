import React from 'react';


export function preprocess(resources) {
	return resources.map((resource, indx) => {
		if (resource.tags) resource.tags = resource.tags.split(',');
		resource.id = indx;
		return resource;
	});
}

export function titleize(string) {
	let arr = string.split(' ');
	arr = arr.map(capitalize);
	return arr.join(' ');
}

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function numCommonElements(arr1, arr2) {
	const intersect = arr1.filter(x => arr2.includes(x)); //[...set1].filter(x=> set2.has(x));
	return intersect.length;
}

export function getLink(url, text) {
	return (url && text && text !== '' && url !== '') ? <a href={url}>{text}</a> : null;
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
