import React, { Component } from 'react';
// import Toolbar from 'preact-material-components/Toolbar';
// import Drawer from 'preact-material-components/Drawer';
// import List from 'preact-material-components/List';
// import Dialog from 'preact-material-components/Dialog';
// import Switch from 'preact-material-components/Switch';
// import 'preact-material-components/Switch/style.css';
// import 'preact-material-components/Dialog/style.css';
// import 'preact-material-components/Drawer/style.css';
// import 'preact-material-components/List/style.css';
// import 'preact-material-components/Toolbar/style.css';
// import style from './style';
import {
	BrowserRouter as Router,
	Link
} from 'react-router-dom';

export default class Header extends Component {
	asd() {
		return 0;
	}
	render() {
		return (
			<div>

				<Router>
					<Link to="/other">Other</Link>
				</Router>
				{/* <Toolbar className="toolbar">
					<Toolbar.Row>
						<Toolbar.Section align-start={true}>
							<Toolbar.Title>
								Preact app
							</Toolbar.Title>
						</Toolbar.Section>
					</Toolbar.Row>
				</Toolbar> */}
			</div>
		);
	}
}
