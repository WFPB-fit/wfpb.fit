import React, { Component } from 'react';
import Typography from 'material-ui/Typography/Typography';

import styled from 'styled-components';

import Grid from 'material-ui/Grid';

const Wrapper = styled(Grid) `
height:380px;
`;

export default class Index extends Component {
    render() {
        return (
            <Wrapper
                container
                spacing={24}
            >
                <Grid item xs={9}>
                    asd
						</Grid>
                <Grid item xs={3}>
                    asd
						</Grid>
            </Wrapper>
        );
    }
}
