import React, { Component } from 'react';

import styled from 'styled-components';

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
            </Wrapper>
        );
    }
}
