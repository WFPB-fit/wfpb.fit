import React, { Component } from 'react';

import LinkableTabs from '../components/tabsDisplay/LinkableTabs.jsx';
import { Typography } from '@material-ui/core';
import { WidthWrapper } from '../utils/GeneralUtils.jsx';

export default class Food extends Component {
    constructor(props) {
        super(props)

        this.tabs = [
            {
                label: 'Getting Started', component: (
                    <WidthWrapper>
                        {/* <Typography variant="headline" gutterBottom gutterTop>
                            Getting Started
                        </Typography> */}

                        <Typography gutterBottom align='left'>
                            {
                                `
                    It is difficult to make major life changes, especially when it comes to what you eat.
                    Food can be integral to one's culture, friends, routines, coping mechanisms, or identity.
                    Though difficult, for many it's a necessity.
                    This site aggregates research into the harmful effects a bad diet can have on fitness, disease, the environment, society, and animal welfare, and the improvements that an evidence backed, whole foods plant-based diet can make.
                    Here we provide guidance for putting the diet into action.
                    `
                            }
                        </Typography>

                        <br />
                    </WidthWrapper>
                )
            },
            {
                label: 'FAQ', component: (
                    <WidthWrapper>

                    </WidthWrapper>
                )
            },
            {
                label: 'EZ Recipes', component: (
                    <WidthWrapper>

                    </WidthWrapper>
                )
            }
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
