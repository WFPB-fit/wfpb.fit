import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';

import styled from 'styled-components';

const width = 200;
const Wrapper = styled.div`
width:${width}px;
margin:40px auto;
`;
const imgWidth = width/2;
const Img = styled.img`
width:${imgWidth}px;
height:${imgWidth}px;
border-radius:${props => (props.isCircle)? `${imgWidth/2}px` : '0px'};
margin:0 auto;
margin-bottom:20px;
display:block;
`;

export default class ImageDangleText extends Component {
    render() {
        return (
            <Wrapper>
                <Img
                    src={this.props.src}
                    alt="Image"
                    // isCircle
                />
                {this.props.text}
            </Wrapper>
        );
    }
}
