import React, { Component } from 'react';

import styled from 'styled-components';
import Typography from 'material-ui/Typography/Typography';

const Container = styled.div`
height:400px;
width:100%;

background-size: cover;
background-image: ${props => `url(${props.src})`};
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
text-shadow: 0 4px 3px rgba(0,0,0,.16), 0 8px 13px rgba(0,0,0,.1), 0 18px 23px rgba(0,0,0,.1);
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
            >
                <Text>
                    <Typography type='display3'>
                        <Color>
                            {this.props.title}
                        </Color>
                    </Typography>
                </Text>
            </Container>
        );
    }
}
