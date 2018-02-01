import React, { Component } from 'react';

import Typography from 'material-ui/Typography/Typography';

import styled from 'styled-components';

const width = '190px';
const Wrapper = styled.div`
width:${width};
padding:70px 0;
margin:0 auto;
`;
const Img = styled.img`
width:${width};
height:${width};
border-radius: ${width};
margin-bottom:20px;
`;

export default class ImageDangleText extends Component {
    render() {
        return (
            <Wrapper>
                <Img
                    src={this.props.src}
                    alt="Image"
                />
                <Typography>{this.props.text}</Typography>
            </Wrapper>
        );
    }
}
