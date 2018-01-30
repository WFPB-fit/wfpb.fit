import React, { Component } from 'react';

import styled from 'styled-components';

import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography/Typography';

import ModifiableUnitBarChart from '../modifiableUnitBarChart';

import { titleize } from '../../utils/GeneralUtils';

const Wrapper = styled.div`
text-align:center;
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
                <ModifiableUnitBarChart
                    units={{
                        "Number Killed": 1,
                        "Dog Equivalents": 1.0 / this.state.dogEq
                    }}
                    data={data}
                />

                <Typography type='caption'>
                    {`Dog Equivalents assume that `}
                    <TextField
                        label=""
                        type="number"
                        value={this.state.dogEq}
                        inputProps={{
                            min: 2 //cannot be 1 else will get confused with number killed
                        }}
                        style={{ width: '40px' }}
                        onChange={this.setDogEq}
                    />

                    {` ${this.props.name.toLowerCase()} `} 
                    are equal to 1 dog's life
                </Typography>
            </Wrapper>
        );
    }
}
