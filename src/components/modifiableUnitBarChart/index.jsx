import React, { Component } from 'react';

import { MenuItem } from 'material-ui/Menu';
import SelectField from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

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
`;
const ContainerDiv = styled.div`
text-align:center;
`;

export default class UnitChart extends Component {
    constructor(props) {
        super(props);

        this.setUnit = this.setUnit.bind(this);
        this.state = {
            unit: 1
        }
    }

    setUnit(event) {
        this.setState({ unit: event.target.value });
    }

    render() {
        let data = this.props.data.map(x => {
            return { x: x.x, y: x.y * this.state.unit };
        });
        const padding = this.props.padding || { top: 5, bottom: 40, left: 100, right: 5 };

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
                                value={this.state.unit}
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
                                padding={padding}
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
