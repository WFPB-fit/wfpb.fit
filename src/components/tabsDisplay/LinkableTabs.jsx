import React, { Component } from 'react';
import Resources from '../resources/index.jsx';
import { Tabs } from 'material-ui/Tabs';
import {
    withRouter
} from 'react-router-dom';

class LinkableTabs extends Component {
    constructor(props) {
        super(props);
        this.getDefaultActiveTab = this.getDefaultActiveTab.bind(this);
    }
    getDefaultActiveTab() {
        const hash = this.props.location.hash;

        let initTabIndex = 0;
        React.Children.forEach(this.props.children, (x, i) => {
            const label = x.props.label;
            if (`#${label.toLowerCase()}` === hash) initTabIndex = i;
        });

        return initTabIndex;
    }
    render() {
        return (
            <Tabs
                initialSelectedIndex={this.getDefaultActiveTab()}
                {...this.props}
            />
        );
    }
}

export default withRouter(LinkableTabs);