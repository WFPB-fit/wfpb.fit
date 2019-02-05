import React, { Component } from 'react';
import ResourceTabs from '../components/tabsDisplay/ResourceTabs.jsx';
import { WidthWrapper } from '../utils/GeneralUtils.jsx';

import learnMoreData from "../assets/data/media.json";
import { preprocess, indexByTags } from "../utils/GeneralUtils.jsx";

export default class extends Component {
	constructor(props) {
		super(props);

		this.tabs = [{
			label: 'Documentaries',
			resources: indexByTags(preprocess(learnMoreData.documentaries))
		}, {
			label: 'Books',
			resources: indexByTags(preprocess(learnMoreData.books))
		}, {
			label: 'Videos',
			resources: indexByTags(preprocess(learnMoreData.videos))
		}, {
			label: 'Wikipedia',
			resources: indexByTags(preprocess(learnMoreData.wikipedia))
		},
		];
	}
	render() {
		return (
			<WidthWrapper>
				<ResourceTabs
					tabs={this.tabs}
				/>
			</WidthWrapper>
		);
	}
}
