import React, { Component } from 'react';

import styled from 'styled-components';
import Typography from 'material-ui/Typography/Typography';

const Container = styled.div`
height:${props => props.height || '400px'};
width:100%;

background-size: cover;

background-image: 
linear-gradient(
  rgba(0, 0, 0, 0.5),
  rgba(0, 0, 0, 0.5)
),
${props => `url(${props.src})`};
background-repeat: no-repeat;
background-position: center; 
position:relative;
`;

const Text = styled.div`
position:absolute;
left: 50%;
top: 50%; 
transform: translate(-50%,-50%);
text-align:center;
`;
const Color = styled.div`
color:white;
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
            <Container
                src={this.props.src}
                height={this.props.height}
            >
                <Text>
                    <Typography type='display3'>
                        <Color>
                            {this.props.title}
                        </Color>
                    </Typography>

                    <Typography type='subheading'>
                        <Color>
                            {this.props.subtitle}
                        </Color>
                    </Typography>
                </Text>
            </Container>
        );
    }
}
