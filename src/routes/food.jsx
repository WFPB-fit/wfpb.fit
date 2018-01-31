import React, { Component } from 'react';

import LinkableTabs from '../components/tabsDisplay/LinkableTabs.jsx';

import NutrientDataVis from '../components/nutrientDataVis';
import YourImpact from '../components/yourImpact';
import TotalImpact from '../components/totalImpact';
import { WidthWrapper } from '../utils/GeneralUtils.jsx';

export default class Food extends Component {
    constructor(props) {
        super(props)

        this.tabs = [
            { label: 'Nutrients', component: (<NutrientDataVis />) },
            { label: 'Total Impact', component: (<TotalImpact />) },
            { label: 'Your Impact', component: (<YourImpact />) },
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
