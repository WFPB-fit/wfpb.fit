import React, { Component } from 'react';

import styled from 'styled-components';

// import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import Slaughter from '../../assets/data/animals/slaughter.js';
import SlaughterViz from './slaughterViz.jsx';


const Wrapper = styled.div`
img{
    display:block;
    margin:0 auto;
}
`;

export default class TotalImpact extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Wrapper>
                <h2>Environment</h2>
                <h3>Types of Food</h3>
                <img src="/imgs/data/wri_food_impact.png" alt="Impact of each type of food" />

                <h2>Animals</h2>

                {
                    Slaughter.map(x => (
                        <SlaughterViz
                            data={x.data}
                            name={x.name}
                            key={x.name}
                        />
                    ))
                }
                {/* <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Animal</TableCell>
                            <TableCell>Number Killed (2016)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {slaughterData.map(n => {
                            return (
                                <TableRow key={n.x}>
                                    <TableCell>{n.x}</TableCell>
                                    <TableCell numeric>{n.y.toLocaleString()}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table> */}
            </Wrapper>
        );
    }
}
