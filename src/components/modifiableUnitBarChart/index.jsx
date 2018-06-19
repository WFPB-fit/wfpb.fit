import React, { Component } from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input'; import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import {
    VictoryChart, VictoryTheme, VictoryBar
} from 'victory';

import styled from 'styled-components';

import { titleize } from '../../utils/GeneralUtils';

const GraphDiv = styled.div`
display:inline-block;
max-width:650px;
`;
const GraphCenterer = styled.div`
display: flex;
align-items: center;
`;
const CenteredForm = styled(FormControl) `
transform: translateY(-50%);
`;
const FlexContainer = styled.div`
display:inline-block;
`;
const GraphContainer = styled.div`
display:block;
text-align:center;
`;
const ContainerDiv = styled.div`
text-align:center;
`;

export default class UnitChart extends Component {
    constructor(props) {
        super(props);

        this.setUnit = this.setUnit.bind(this);
        this.getKeyWithValue = this.getKeyWithValue.bind(this);
        this.state = {
            unit: this.getKeyWithValue(1)
        }
    }

    setUnit(event) {
        this.setState({ unit: this.getKeyWithValue(event.target.value) });
    }

    getKeyWithValue(val) {
        return Object.keys(this.props.units).filter(x => this.props.units[x] === val)[0];
    }

    render() {
        const unitVal = this.props.units[this.state.unit];
        let data = this.props.data.map(x => {
            return { x: x.x, y: x.y * unitVal };
        });
        const unitId = `units-${null}`;

        return (
            <GraphContainer>
                <FlexContainer>
                    <GraphCenterer>
                        <CenteredForm>
                            <InputLabel htmlFor={unitId}>Units</InputLabel>
                            <SelectField
                                input={<Input name="sort" id={unitId} />}
                                onChange={this.setUnit}
                                value={unitVal}
                                style={{ textAlign: 'left' }}
                            >
                                {
                                    Object.keys(this.props.units).map(x => {
                                        return <MenuItem key={x} value={this.props.units[x]}>{titleize(x)}</MenuItem>
                                    })
                                }
                            </SelectField>
                        </CenteredForm>

                        <GraphDiv>
                            <VictoryChart
                                theme={VictoryTheme.material}
                                domainPadding={10}
                                padding={this.props.padding || { top: 5, bottom: 40, left: 100, right: 5 }}
                            >
                                <VictoryBar
                                    style={{ data: { fill: "#c43a31" } }}
                                    data={data}
                                />
                            </VictoryChart>
                        </GraphDiv>
                    </GraphCenterer>
                </FlexContainer>
            </GraphContainer>
        );
    }
}
