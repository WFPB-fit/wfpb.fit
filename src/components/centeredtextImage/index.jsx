import React, { Component } from 'react';

import styled from 'styled-components';

import Typography from 'material-ui/Typography/Typography';
import Button from 'material-ui/Button';

import BgImg from './backgroundImg.jsx';

const Center = styled.div`
position:absolute;
left: 50%;
top: 50%; 
transform: translate(-50%,-50%);
`;

export default class CenteredTextImage extends Component {
    constructor(props) {
        super(props);

        // this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        // this.state = { width: 0 };
    }


    // componentDidMount() {
    // 	this.updateWindowDimensions();
    // 	window.addEventListener('resize', this.updateWindowDimensions);
    // }

    // updateWindowDimensions() {
    // 	this.setState({ width: window.innerWidth });
    // }

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
