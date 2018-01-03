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
        const {match, location, history, staticContext, ...nonrouterProps} = this.props; //https://github.com/DefinitelyTyped/DefinitelyTyped/issues/13689#issuecomment-296246134

        return (
            <Tab
                onActive={this.onActive}
                {...nonrouterProps}
            />
        );
    }
}

let TabExport = withRouter(LinkableTab);
TabExport.muiName = 'Tab'; // https://github.com/mui-org/material-ui/issues/3622
export default TabExport;