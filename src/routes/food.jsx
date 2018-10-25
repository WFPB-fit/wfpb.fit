import React, { Component } from 'react';

import LinkableTabs from '../components/tabsDisplay/LinkableTabs.jsx';

import NutrientDataVis from '../components/nutrientDataVis';
import YourImpact from '../components/yourImpact';
import { WidthWrapper } from '../utils/GeneralUtils.jsx';

export default class Food extends Component {
    constructor(props) {
        super(props)

        this.tabs = [
            { label: 'Nutrition', component: (<NutrientDataVis />) },
            { label: 'Environment', component: (<YourImpact />) },
        ];
    }
    render() {
        return (
            <WidthWrapper>
                <LinkableTabs
                    tabs={this.tabs}
                />
            </WidthWrapper>
        );
    }
}
