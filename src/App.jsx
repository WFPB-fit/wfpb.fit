import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route, Switch
} from 'react-router-dom';
import Header from './components/header/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import studyData from './assets/data/studies.json';
import learnMoreData from './assets/data/learn-more.json';

import Health from './routes/health';
import Externalities from './routes/externalities';
import LearnMore from './routes/learn-more';

export default class App extends Component {
	static preprocessResources(resources) {
		return resources.map((resource, indx) => {
			resource.tags = resource.tags.split(',');
			resource.id = indx;
			return resource;
		});
	}
	constructor(props) {
		super(props);

		//simple global data container
		window.globalAppData = {
			appName: 'Plant-Based Diet',
			studies: App.preprocessResources(studyData),
			learnMore: {
				documentaries: App.preprocessResources(learnMoreData.documentaries),
				videos: App.preprocessResources(learnMoreData.videos),
				books: App.preprocessResources(learnMoreData.books),
			}
		};
		document.title = window.globalAppData.appName;
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
								<Route path="/learn-more" component={LearnMore} />
							</Switch>
						</div>
					</Router>
				</div>
			</MuiThemeProvider>
		);
	}
}
