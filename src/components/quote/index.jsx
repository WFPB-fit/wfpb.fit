import React, { Component } from 'react';

import Typography from 'material-ui/Typography';

import styled from 'styled-components';

const Q = styled(Typography) `
padding: 0 8px;
margin: 5px 0 5px 5px;
border-left: 2px solid #c5c1ad;
color: #4f4f4f;
`;

export default class Quote extends Component {
    render() {

        return (
            <Q component="blockquote">
                "
                    {this.props.children}
                "
            </Q>
        );
    }
}
