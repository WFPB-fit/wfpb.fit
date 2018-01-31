import React, { Component } from 'react';

import LinkableTabs from '../components/tabsDisplay/LinkableTabs.jsx';


export default class Food extends Component {
    constructor(props) {
        super(props)

        this.tabs = [
            { label: 'Nutrients', component: (<div />) },
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
