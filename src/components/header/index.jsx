import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import {
	BrowserRouter as Router,
	Link
} from 'react-router-dom';

export default class Header extends Component {
	asd() {
		return 0;
	}
	render() {
		let elRight = (
			<Router>
				<FlatButton
					label="Other"
					containerElement={<Link to="/other" />} />
			</Router>
		);
		return (
			<AppBar
				title={<span>Title</span>}
				// onTitleTouchTap={handleTouchTap}
				iconElementRight={elRight}
			/>
		);
	}
}
