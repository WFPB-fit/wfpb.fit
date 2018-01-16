import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';

import styled from 'styled-components';

import WRR from '../../../assets/data/environment/wrr.js';

export default class CalorieForm extends Component {
    constructor(props) {
        super(props);

        this.toggleOverallVisible = this.toggleOverallVisible.bind(this);

        this.state = {
            overallVisible: false
        }
    }

    toggleOverallVisible() {
        this.setState({ overallVisible: !this.state.overallVisible });
    }

    render() {

        return (
            <div>
                <CalorieEstimator />

                <Button
                    raised
                    color="primary"
                    onClick={this.toggleOverallVisible}
                >
                    {(this.state.overallVisible) ? 'Hide Overall' : 'View Overall'}
                </Button>

                <HideableDiv
                    visible={this.state.overallVisible}
                >
                    <p>asd</p>
                </HideableDiv>
            </div>
        );
    }
}
