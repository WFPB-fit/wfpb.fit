import React, { Component } from 'react';
import NutrientDataVis from '../components/nutrientDataVis';
import { Tabs, Tab } from 'material-ui/Tabs';
import { withRouter } from 'react-router-dom';

import LinkableTabs from '../components/tabsDisplay/LinkableTabs.jsx';
import LinkableTab from '../components/tabsDisplay/LinkableTab.jsx';

import CalorieEstimator from '../components/calorieEstimator';

export default class Food extends Component {
    render() {
        return (
            <LinkableTabs>
                <LinkableTab
                    label={'Nutrients'}
                >
                    <NutrientDataVis />
                </LinkableTab>

                <LinkableTab
                    label={'Environment'}
                >
                    <CalorieEstimator/>
                </LinkableTab>

                <LinkableTab
                    label={'Animals'}
                >
                </LinkableTab>
            </LinkableTabs>
        );
    }
}
