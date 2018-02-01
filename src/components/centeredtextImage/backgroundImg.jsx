import React, { Component } from 'react';

import styled from 'styled-components';

const Container = styled.div`
height:${props => props.height || '400px'};
width:100%;

background-size: cover;

background-image: 
linear-gradient(
  rgba(0, 0, 0, 0.7),
  rgba(0, 0, 0, 0.7)
),
${props => `url(${props.src})`};
background-repeat: no-repeat;
background-position: center; 
position:relative;
`;

export default class CenteredTextImage extends Component {
    render() {
        return (
            <Container
                src={this.props.src}
                height={this.props.height}
            >
                {this.props.children}
            </Container>
        );
    }
}
