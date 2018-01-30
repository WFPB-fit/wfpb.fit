import React, { Component } from 'react';

import styled from 'styled-components';

// import Typography from 'material-ui/Typography/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

// import {
//     VictoryChart, VictoryTheme, VictoryLine, VictoryAxis, VictoryZoomContainer
// } from 'victory';

import { titleize, getRandomColor } from '../../utils/GeneralUtils';
import SlaughterData from '../../assets/data/animals/slaughter.js';

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
        let data = SlaughterData.sort((x, y) => {
            return x.data['2016'] - y.data['2016'];
        });
        data = data.map(x => {
            return { x: x.name, y: (x.data['2016'] * 1000).toLocaleString() } //data in units of 1,000 head
        }, {});

        return (
            <Wrapper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Animal</TableCell>
                            <TableCell>Number Killed (2016)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(n => {
                            return (
                                <TableRow key={n.x}>
                                    <TableCell>{n.x}</TableCell>
                                    <TableCell numeric>{n.y}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                {/* <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={10}
                    padding={this.props.padding || { top: 5, bottom: 40, left: 105, right: 5 }}
                    containerComponent={
                        <VictoryZoomContainer />
                    }
                >
                    <VictoryAxis dependentAxis
                        label="Number Killed"
                        style={{
                            axisLabel: { padding: 93 },
                        }}
                    />
                    <VictoryAxis independentAxis />
                    {
                        SlaughterData.map(x => {
                            const data = Object.keys(x.data).map(key => { return { x: key, y: x.data[key] } });
                            if (x.name.toLowerCase() === "baby chickens") return null
                            return (
                                <VictoryLine
                                    key={x.name}
                                    data={data}
                                    style={{
                                        data: { stroke: getRandomColor() },
                                    }}
                                />
                            );
                        })
                    }
                </VictoryChart> */}
            </Wrapper>
        );
    }
}
