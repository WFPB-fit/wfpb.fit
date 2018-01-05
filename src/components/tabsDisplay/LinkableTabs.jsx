import React, { Component } from 'react';

import Tabs, { Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';

import { withRouter } from 'react-router-dom';

import Resources from '../resources/index.jsx';
import styled from 'styled-components';

const StyledTabs = styled(Tabs)`
margin:5px;
`;

class LinkableTabs extends Component {
    constructor(props) {
        super(props);
        this.getDefaultActiveTab = this.getDefaultActiveTab.bind(this);
        this.switchTab = this.switchTab.bind(this);

        this.state = {
            activeTabIndex: this.getDefaultActiveTab()
        }
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

    switchTab(event, activeTabIndex) {
        this.setState({ activeTabIndex });

        //make shareable - modify URL
        const tabName = this.props.tabs[activeTabIndex].label.toLowerCase();
        this.props.history.replace(`#${tabName}`);
    }
    render() {
        const { match, location, history, staticContext, ...nonrouterProps } = this.props; //https://github.com/DefinitelyTyped/DefinitelyTyped/issues/13689#issuecomment-296246134
        return (
            <div>
                <Paper>
                    <StyledTabs
                        fullWidth
                        centered
                        onChange={this.switchTab}
                        value={this.state.activeTabIndex}
                        {...nonrouterProps}
                    >
                        {
                            this.props.tabs.map(x => <Tab key={x.label} label={x.label} />)
                        }
                    </StyledTabs>
                </Paper>
                {
                    this.props.tabs[this.state.activeTabIndex].component
                }
            </div>
        );
    }
}

export default withRouter(LinkableTabs);