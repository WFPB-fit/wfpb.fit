import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route, Switch
} from 'react-router-dom';
import Header from './components/header/index';
import Health from './routes/health';
import Externalities from './routes/externalities';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import studies from './assets/data/studies.json';

export default class App extends Component {
	static preprocessStudies(studies) {
		return studies.map((study, indx) => {
			study.tags = study.tags.split(',');
			study.id = indx;
			return study;
		});
	}
	constructor(props) {
		super(props);
		window.globalAppData = {}; //too small of an App to require Redux
		window.globalAppData.studies = App.preprocessStudies(studies);
	}

	render() {
		return (
			<MuiThemeProvider>
				<div id="app">
					<Router >
						<div>
							<Header />
							<Switch>
								<Route path="/health" component={Health} />
								<Route path="/externalities" component={Externalities} />
							</Switch>
						</div>
					</Router>
				</div>
			</MuiThemeProvider>
		);
	}
}
