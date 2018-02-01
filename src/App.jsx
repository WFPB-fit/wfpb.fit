import React, { Component } from 'react';

import {
	BrowserRouter as Router,
	Route, Switch
} from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import styled from 'styled-components';

import studyData from './assets/data/studies.json';
import learnMoreData from './assets/data/learn-more.json';
import { preprocess, indexByTags } from './utils/GeneralUtils.jsx';
import Header from './components/header';
import Footer from './components/footer';

import Home from './routes/home.jsx';
import Food from './routes/food.jsx';
import Research from './routes/research';
import Endorsements from './routes/endorsements';
import LearnMore from './routes/learn-more';

import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

import DataLoader from './utils/data/DataLoader.js';

import { Provider } from 'react-redux'
import { createStore } from 'redux';
import rootReducer from './utils/data/reducers';

// import Parse from './utils/fdaDataCreation/parseFdaData';
// Parse.parse(store);

let store = createStore(
	rootReducer
);
const theme = createMuiTheme();

window.navLinks = [
	{ txt: 'Home', href: '/' },
	{ txt: 'Research', href: '/research' },
	{ txt: 'Compare Foods', href: '/food' },
	{ txt: 'Supplies', href: '/supplies' },
	{ txt: 'Learn More', href: '/learn-more' },
	{ txt: 'Endorsements', href: '/endorsements' },
];

const Wrapper = styled.div`
display: flex;  
min-height: 100%;
flex-direction: column;
justify-content:space-between;
`;
const Body = styled.div`
flex:1;
`;

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

		this.saveOpenNav = this.saveOpenNav.bind(this);

		DataLoader.init(store);
		this.state = {
			openNav: () => { }
		}

		this.MyHome = (props) => {
			return (
				<Home
					openNav={this.state.openNav} //pass ability to open nav
					{...props}
				/>
			);
		}
	}

	saveOpenNav(x) {
		this.setState({ openNav: x });
	}

	render() {
		return (
			<Provider store={store}>
				<MuiThemeProvider theme={theme}>
						<Router >
							<Wrapper>
								<Header saveOpenDialog={this.saveOpenNav} />
								<Body>
									<Switch>
										<Route exact path="/" render={this.MyHome} />
										<Route path="/research" component={Research} />
										<Route path="/food" component={Food} />
										<Route path="/learn-more" component={LearnMore} />
										<Route path="/endorsements" component={Endorsements} />
									</Switch>
								</Body>
								<Footer />
							</Wrapper>
						</Router>
				</MuiThemeProvider>
			</Provider>
		);
	}
}
