import React, { Component } from "react";

import { withRouter } from "react-router-dom";

import { alphaCompare } from "../../utils/GeneralUtils.jsx";
import ReactSelect, { createFilter } from 'react-select';

class LinkableSelect extends Component {
	tagsChanged = (value) => {
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

	setSelectablesFromURL = (options, paramName, paramSeparator) => {
		let indexedOptions = {}
		for (let selectable of options) {
			indexedOptions[selectable.value] = selectable.label;
		}

		//set initial tags from url params
		const currentUrl =
			new URLSearchParams(this.props.location.search).get(paramName) || "";
		const urlTags = currentUrl.split(paramSeparator);
		const realUrlTags = urlTags.filter(t => t in indexedOptions);

		let selectables = [];
		for (let tag of realUrlTags) {
			selectables.push({ value: tag, label: indexedOptions[tag] });
		}
		selectables = selectables.sort(alphaCompare);

		this.props.onChange(selectables);
	}

	componentDidMount() {
		if (this.props.options) {
			this.setSelectablesFromURL(
				this.props.options,
				this.props.paramName,
				this.props.paramSeparator
			);
		}
	}

	render() {
		return (
			<ReactSelect
				style={{ margin: "5px 0" }}
				value={this.props.value}
				onChange={this.tagsChanged}
				options={this.props.options}
				onBlur={event => event.preventDefault()} //https://github.com/JedWatson/react-select/issues/2692
				name="virtual-select-form"
				filterOption={createFilter({
					ignoreCase: true,
					trim: true,
					ignoreAccents: true,
					matchFrom: "any"
				})}
				isMulti
			/>
		);
	}
}

LinkableSelect.defaultProps = {
	paramSeparator: "_",
	paramName: "selected"
};

export default withRouter(LinkableSelect);
