import React, { Component } from 'react';
import NutrientDataVis from '../components/nutrientDataVis';
import { Tabs, Tab } from 'material-ui/Tabs';
import { withRouter } from 'react-router-dom';

import LinkableTabs from '../components/tabsDisplay/LinkableTabs.jsx';

import YourImpact from '../components/yourImpact';
import TotalImpact from '../components/totalImpact';

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
            <LinkableTabs
                tabs={this.tabs}
            />
        );
    }
}
