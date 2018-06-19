import React, { Component } from 'react';

import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import Dialog, {
    // DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

import styled from 'styled-components';

const RotateIcon = styled(IconButton) `
transform:${props => props['aria-expanded'] ? 'rotate(180deg)' : 'rotate(0deg)'};
`

export default class Resource extends Component {
    constructor(props) {
        super(props);
        this.learnMoreClick = this.learnMoreClick.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);

        this.state = {
            expanded: false
        }
    }

    learnMoreClick() {
        this.setState({ expanded: !this.state.expanded });
    }
    handleDialogClose() {
        this.setState({ expanded: false });
    }

    render() {
        return (
            <span>
                <RotateIcon
                    onClick={this.learnMoreClick}
                    aria-expanded={this.state.expanded}
                    aria-label="Show more"
                >
                    <HelpIcon />
                </RotateIcon>

                <Dialog
                    open={this.state.expanded}
                    onClose={this.handleDialogClose}
                >
                    <DialogTitle>{this.props.title}</DialogTitle>
                    <DialogContent>
                        {this.props.content}
                        {/* <DialogActions></DialogActions> */}
                        {/* <DialogContentText> {resource.quote || resource.summary}</DialogContentText> */}
                    </DialogContent>
                </Dialog>
            </span>
        );
    }
}
