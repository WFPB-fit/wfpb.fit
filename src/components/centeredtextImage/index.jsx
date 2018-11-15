import React, { Component } from 'react';

import styled from 'styled-components';

import BgImg from './backgroundImg.jsx';

const Center = styled.div`
position:absolute;
left: 50%;
top: 50%; 
transform: translate(-50%,-50%);
`;

export default class CenteredTextImage extends Component {

    render() {
        return (
            <BgImg
                src={this.props.src}
                height={this.props.height}
            >
                <Center>
                    {this.props.children}
                </Center>
            </BgImg>
        );
    }
}
