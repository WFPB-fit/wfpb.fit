import React, { Component } from 'react';

import {
	BrowserRouter as Router,
	Route, Switch
} from 'react-router-dom';

import styled from 'styled-components';

import learnMoreData from './assets/data/learn-more.json';
import { preprocess, indexByTags } from './utils/GeneralUtils.jsx';
import Header from './components/header';
import Footer from './components/footer';

import Home from './routes/home.jsx';
import Supplies from './routes/supplies.jsx';
import Data from './routes/food.jsx';
// import Research from './routes/research';
import ResearchContainer from './routes/research_container.jsx';
import LearnMore from './routes/learn-more';
import Endorsements from './routes/endorsements';

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

// used for the options in the Navigation drawer
window.navLinks = [
	{ txt: 'Home', href: '/' },
	{ txt: 'Getting Started', href: '/getting-started' },
	{ txt: 'Research', href: '/research' },
	{ txt: 'Data', href: '/data' },
	// { txt: 'Supplies', href: '/supplies' },
	{ txt: 'Media', href: '/media' },
	{ txt: 'Endorsements', href:'/endorsements'}
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
						<Router >
							<Wrapper>
								<Header saveOpenDialog={this.saveOpenNav} />
								<Body>
									<Switch>
										<Route exact path="/" render={this.MyHome} />
										<Route path="/research" component={ResearchContainer} />
										{/* <Route path="/supplies" component={Supplies} /> */}
										<Route path="/data" component={Data} />
										<Route path="/endorsements" component={Endorsements}/>
										<Route path="/getting-started" component={null} />
										<Route path="/media" component={LearnMore} />
									</Switch>
								</Body>
								<Footer />
							</Wrapper>
						</Router>
			</Provider>
		);
	}
}
