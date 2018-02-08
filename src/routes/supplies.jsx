import React, { Component } from 'react';

import LinkableTabs from '../components/tabsDisplay/LinkableTabs.jsx';
import Resource from '../components/resource';
import SuppliesData from '../assets/data/supplies.js';
import { WidthWrapper } from '../utils/GeneralUtils.jsx';


export default class Supplies extends Component {
    constructor(props) {
        super(props)

        this.tabs = Object.keys(SuppliesData);
        this.tabs = this.tabs.map(supplyType => {
            return {
                label: supplyType,
                component: (
                    <div>
                        {
                            SuppliesData[supplyType].map(supply=> {
                                return <Resource
                                    resource={supply}
                                    key={supply.url}
                                />
                            })
                        }
                    </div>
                )
            }
        })
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
