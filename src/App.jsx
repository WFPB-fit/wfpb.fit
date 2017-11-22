import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route, Switch
} from 'react-router-dom';
import Header from './components/header/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import studyData from './assets/data/studies.json';
import learnMoreData from './assets/data/learn-more.json';
import { preprocess, CenteredDiv } from './utils/GeneralUtils.jsx';

import Home from './routes/home';
import Food from './routes/food';
import Health from './routes/health';
import Externalities from './routes/externalities';
import Endorsements from './routes/endorsements';
import LearnMore from './routes/learn-more';

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
							{/* <PieChart x={100} y={100} outerRadius={100} innerRadius={50}
								data={[{ value: 92 - 34, label: 'Code lines' },
								{ value: 34, label: 'Empty lines' }]} /> */}
							<Switch>
								<CenteredDiv>
									<Route exact path="/" component={Home} />
									<Route path="/health" component={Health} />
									<Route path="/food" component={Food} />
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
