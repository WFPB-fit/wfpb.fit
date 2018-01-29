import React, { Component } from 'react';

import styled from 'styled-components';

import {
    VictoryChart, VictoryTheme, VictoryBar
} from 'victory';

import { titleize } from '../../utils/GeneralUtils';

const Wrapper = styled.div`

`;

export default class SlaughterViz extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = Object.keys(this.props.data).map(key => { return { x: key, y: this.props.data[key] * 1000 } }); //USDA data is per 1,000 head units

        return (
            <Wrapper>
                <h3>{titleize(this.props.name)}</h3>
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={10}
                    padding={{ top: 5, bottom: 40, left: 100, right: 5 }}
                >
                    <VictoryBar
                        style={{ data: { fill: "#c43a31" } }}
                        data={data}
                    />
                </VictoryChart>
            </Wrapper>
        );
    }
}
