import React, { Component } from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
background-color:#ccc;
`;

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Wrapper>
                sticky,variable height footer
			</Wrapper>
        );
    }
}
