import React, { Component } from 'react';
import NutrientDataVis from '../components/nutrientDataVis';
import { Tabs, Tab } from 'material-ui/Tabs';
import { withRouter } from 'react-router-dom';

import LinkableTabs from '../components/tabsDisplay/LinkableTabs.jsx';

import CalorieEstimator from '../components/calorieEstimator';

export default class Food extends Component {
    constructor(props) {
        super(props)

        this.tabs = [
            { label: 'Nutrients', component: (<NutrientDataVis />) },
            { label: 'My Diet', component: (<CalorieEstimator />) },
            { label: 'Data', component: (<div/>) },
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
