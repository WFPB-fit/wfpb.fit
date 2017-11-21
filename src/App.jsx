import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route, Switch
} from 'react-router-dom';
import Header from './components/header/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import studyData from './assets/data/studies.json';
import learnMoreData from './assets/data/learn-more.json';
import { preprocess, CenteredDiv } from './utils.jsx';

import Health from './routes/health';
import Externalities from './routes/externalities';
import Endorsements from './routes/endorsements';
import LearnMore from './routes/learn-more';

import DataVis from './components/foodAnalysis/index.jsx';
import Pie from './components/foodAnalysis/pie.jsx';

export default class App extends Component {
	constructor(props) {
		super(props);

		//simple global data container
		window.globalAppData = {
			appName: 'Plant-Based Diet',
			studies: preprocess(studyData),
			learnMore: {
				documentaries: preprocess(learnMoreData.documentaries),
				videos: preprocess(learnMoreData.videos),
				books: preprocess(learnMoreData.books),
				wikipedia: preprocess(learnMoreData.wikipedia),
			}
		};
		document.title = window.globalAppData.appName; //set tab title
	}


	render() {
		return (
			<MuiThemeProvider>
				<div id="app">
					<Router >
						<div>
							<Header />
							<Pie />
							<Switch>
								<CenteredDiv>
									<Route path="/health" component={Health} />
									<Route path="/externalities" component={Externalities} />
									<Route path="/learn-more" component={LearnMore} />
									<Route path="/endorsements" component={Endorsements} />
								</CenteredDiv>
							</Switch>
						</div>
					</Router>
				</div>
			</MuiThemeProvider>
		);
	}
}
