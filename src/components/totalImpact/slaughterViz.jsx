import React, { Component } from 'react';

import styled from 'styled-components';

import Typography from 'material-ui/Typography/Typography';

import {
    VictoryChart, VictoryTheme, VictoryBar, VictoryAxis
} from 'victory';

import { titleize } from '../../utils/GeneralUtils';

const Wrapper = styled.div`
text-align:center;
max-width:350px;
margin:0 auto;
`;

export default class SlaughterViz extends Component {
    constructor(props) {
        super(props);
        this.setDogEq = this.setDogEq.bind(this);

        this.state = {
            dogEq: 5,
        }
    }

    setDogEq(event) {
        this.setState({ dogEq: event.target.value });
    }

    render() {
        const data = Object.keys(this.props.data).map(key => { return { x: key, y: this.props.data[key] * 1000 } }); //USDA data is per 1,000 head units
        return (
            <Wrapper>
                <h3>{titleize(this.props.name)}</h3>

                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={10}
                    padding={this.props.padding || { top: 5, bottom: 40, left: 105, right: 5 }}
                >
                    <VictoryAxis dependentAxis
                        label="Number Killed"
                        style={{
                            axisLabel: { padding: 93 },
                        }}
                    />
                    <VictoryAxis independentAxis />
                    <VictoryBar
                        style={{ data: { fill: "#c43a31" } }}
                        data={data}
                    />
                </VictoryChart>
            </Wrapper>
        );
    }
}
