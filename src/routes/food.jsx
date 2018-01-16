import React, { Component } from 'react';
import NutrientDataVis from '../components/nutrientDataVis';
import { Tabs, Tab } from 'material-ui/Tabs';
import { withRouter } from 'react-router-dom';

import LinkableTabs from '../components/tabsDisplay/LinkableTabs.jsx';

import CalorieEstimator from '../components/calorieEstimator';
import Impact from '../components/impact';

export default class Food extends Component {
    constructor(props) {
        super(props)

        this.tabs = [
            { label: 'Nutrients', component: (<NutrientDataVis />) },
            { label: 'Impact', component: (<Impact />) },
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
