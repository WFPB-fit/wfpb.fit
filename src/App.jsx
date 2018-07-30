import React, { Component } from 'react';

import {
	BrowserRouter as Router,
	Route, Switch
} from 'react-router-dom';

import styled from 'styled-components';

import learnMoreData from './assets/data/media.json';
import { preprocess, indexByTags } from './utils/GeneralUtils.jsx';
import Header from './components/header';
import Footer from './components/footer';

import Home from './routes/home.jsx';
import Supplies from './routes/supplies.jsx';
import Data from './routes/food.jsx';
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

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// import Parse from './utils/fdaDataCreation/parseFdaData';
// Parse.parse(store);

let store = createStore(
	rootReducer
);

// used for the options in the Navigation drawer
window.navLinks = [
	{ txt: 'Home', href: '/' },
	{ txt: 'Research', href: '/research' },
	{ txt: 'Data', href: '/data' },
	// { txt: 'Supplies', href: '/supplies' },
	{ txt: 'Media', href: '/media' },
	{ txt: 'Endorsements', href: '/endorsements' }
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

const theme = createMuiTheme({
	typography: { htmlFontSize: 14 }
});

export default class App extends Component {
	constructor(props) {
		super(props);
		this.header = React.createRef();

		this.toggleDrawer = this.toggleDrawer.bind(this);
		this.closeDrawer = this.closeDrawer.bind(this);

		//simple global data container
		window.globalAppData = {
			appName: 'Whole Food Plant-Based Diet',
			learnMore: {
				documentaries: indexByTags(preprocess(learnMoreData.documentaries)),
				videos: indexByTags(preprocess(learnMoreData.videos)),
				books: indexByTags(preprocess(learnMoreData.books)),
				wikipedia: indexByTags(preprocess(learnMoreData.wikipedia)),
			}
		};
		document.title = window.globalAppData.appName; //set tab title

		DataLoader.init(store);

		this.state = {
			drawerOpen: false
		};
	}

	toggleDrawer() {
		this.setState({ drawerOpen: !this.state.drawerOpen });
	}
	closeDrawer(e) {
		this.setState({ drawerOpen: false });
	}

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Provider store={store}>
					<Router >
						<Wrapper>
							<Header
								toggleDrawer={this.toggleDrawer}
								closeDrawer={this.closeDrawer}
								drawerOpen={this.state.drawerOpen}
							/>
							<Body>
								<Switch>
									<Route exact path="/"
										render={(props) => <Home {...props} toggleDrawer={this.toggleDrawer} />} />
									<Route path="/research" component={ResearchContainer} />
									<Route path="/data" component={Data} />
									<Route path="/endorsements" component={Endorsements} />
									<Route path="/media" component={LearnMore} />
								</Switch>
							</Body>
							<Footer />
						</Wrapper>
					</Router>
				</Provider>
			</MuiThemeProvider>
		);
	}
}
