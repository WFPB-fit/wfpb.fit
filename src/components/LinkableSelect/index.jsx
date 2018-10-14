import React, { Component } from "react";

import VirtualizedSelect from "react-virtualized-select";
import { withRouter } from "react-router-dom";

import { alphaCompare } from "../../utils/GeneralUtils.jsx";

class LinkableSelect extends Component {
	tagsChanged(value) {
		this.props.onChange(value);

		//update URL to match the new tags
		const newTags = value.map(selectable => selectable.value); //get tag values from select options
		const tagSearchParam =
			newTags.length > 0 ? newTags.join(this.props.paramSeparator) : ""; //create the query string

		//create a new URL using the tags new params
		let url = new URL(window.location.href);
		let params = url.searchParams;

		//delete the old param and add the new one
		params.delete(this.props.paramName);
		params.append(this.props.paramName, tagSearchParam);

		//update URL
		this.props.history.replace(url.toString().replace(url.origin, ""));
	}

	setSelectablesFromURL(optionsValues, paramName, paramSeparator) {
		//set initial tags from url params
		const currentUrl =
			new URLSearchParams(this.props.location.search).get(paramName) || "";
		const urlTags = currentUrl.split(paramSeparator);
		const realUrlTags = urlTags.filter(t => t in optionsValues);

		let selectables = [];
		for (let tag of realUrlTags) {
			selectables.push({ value: tag, label: optionsValues[tag] });
		}
		selectables = selectables.sort(alphaCompare);

		this.props.onChange(selectables);
	}

	constructor(props) {
		super(props);
		//bind fucntions to this class
		this.tagsChanged = this.tagsChanged.bind(this);
		this.setSelectablesFromURL = this.setSelectablesFromURL.bind(this);
	}

	componentDidMount() {
		if (this.props.options) {
			let optionsValues = {};
			for (let selectable of this.props.options) {
				optionsValues[selectable.value] = selectable.label;
			}
			this.setSelectablesFromURL(
				optionsValues,
				this.props.paramName,
				this.props.paramSeparator
			);
		}
	}

	render() {
		const { onChange, ...props } = this.props;

		return (
			<VirtualizedSelect
				style={{ margin: "5px 0" }}
				onChange={this.tagsChanged}
				{...props}
				name="form-field-name"
				joinValues
				multi
			/>
		);
	}
}

LinkableSelect.defaultProps = {
	paramSeparator: "_",
	paramName: "selected"
};

export default withRouter(LinkableSelect);
