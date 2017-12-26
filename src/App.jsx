import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route, Switch
} from 'react-router-dom';
import Header from './components/header/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import studyData from './assets/data/studies.json';
import learnMoreData from './assets/data/learn-more.json';
import { preprocess, indexByTags, CenteredDiv } from './utils/GeneralUtils.jsx';

import Home from './routes/home';
import Food from './routes/food';
import Health from './routes/health';
import Externalities from './routes/externalities';
import Endorsements from './routes/endorsements';
import LearnMore from './routes/learn-more';

import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

// import Parse from './utils/fdaDataCreation/parseFdaData';
// Parse.parse();

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './utils/data/reducers';
let store = createStore(
	rootReducer
);

export default class App extends Component {
	constructor(props) {
		super(props);

		//simple global data container
		window.globalAppData = {
			appName: 'Plant-Based Diet',
			studies: indexByTags(preprocess(studyData)),
			learnMore: {
				documentaries: indexByTags(preprocess(learnMoreData.documentaries)),
				videos: indexByTags(preprocess(learnMoreData.videos)),
				books: indexByTags(preprocess(learnMoreData.books)),
				wikipedia: indexByTags(preprocess(learnMoreData.wikipedia)),
			}
		};
		document.title = window.globalAppData.appName; //set tab title

		this.loadData();
	}

	async loadData() {
		import('./assets/data/importantNutrients.js').then(data => {
			// store.dispatch({
			// 	type: 'ADD_FG_NAME_INDEX',
			// 	foodGroups: data
			// });
			// store.dispatch({
			// 	type: 'ADD_FG_ID_INDEX',
			// 	foodGroups: data
			// });
		})
		import('./assets/data/nutrition/foodData.json').then(data => {
			console.log(data)
		});
	}

	render() {
		return (
			<Provider store={store}>
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
			</Provider>
		);
	}
}
