import React, { Component } from 'react';
import { Tab } from 'material-ui/Tabs';
import { withRouter } from 'react-router-dom';

class LinkableTab extends Component {
    constructor(props) {
        super(props);
        this.onActive = this.onActive.bind(this);
    }
    onActive(tab) {
        const tabName = tab.props.label.toLowerCase();
        this.props.history.replace(`#${tabName}`);
    }
    render() {
        return (
            <Tab
                onActive={this.onActive}
                {...this.props}
            />
        );
    }
}

export default withRouter(LinkableTab);