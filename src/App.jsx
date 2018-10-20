import React, { Component } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import styled from "styled-components";

import learnMoreData from "./assets/data/media.json";
import { preprocess, indexByTags } from "./utils/GeneralUtils.jsx";
import Header from "./components/header";
import Footer from "./components/footer";

import Home from "./routes/home.jsx";
import HowTo from "./routes/how-to.jsx";
import Data from "./routes/food.jsx";
import ResearchContainer from "./routes/research_container.jsx";
import LearnMore from "./routes/learn-more";
import Endorsements from "./routes/endorsements";

import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";

import DataLoader from "./utils/data/DataLoader.js";

import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./utils/data/reducers";

import blue from "@material-ui/core/colors/blue";
import orange from "@material-ui/core/colors/orange";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// import Parse from './utils/fdaDataCreation/parseFdaData';
// Parse.parse(store);

let store = createStore(rootReducer);

const Wrapper = styled.div`
	display: flex;
	min-height: 100%;
	flex-direction: column;
	justify-content: space-between;
`;
const Body = styled.div`
	flex: 1;
`;

const theme = createMuiTheme({
	typography: { htmlFontSize: 14 },
	palette: {
		// type: 'dark',
		primary: blue,
		secondary: orange
	}
});

export default class App extends Component {
	constructor(props) {
		super(props);
		this.header = React.createRef();

		//simple global data container
		window.globalAppData = {
			appName: "WFPB.fit",
			learnMore: {
				documentaries: indexByTags(preprocess(learnMoreData.documentaries)),
				videos: indexByTags(preprocess(learnMoreData.videos)),
				books: indexByTags(preprocess(learnMoreData.books)),
				wikipedia: indexByTags(preprocess(learnMoreData.wikipedia))
			}
		};
		document.title = window.globalAppData.appName; //set tab title

		DataLoader.init(store);
	}

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Provider store={store}>
					<Router>
						<Wrapper>
							<Header />
							<Body>
								<Switch>
									<Route exact path="/" render={props => <Home {...props} />} />
									<Route path="/research" component={ResearchContainer} />
									<Route path="/data" component={Data} />
									<Route path="/endorsements" component={Endorsements} />
									<Route path="/media" component={LearnMore} />
									<Route path="/how-to" component={HowTo} />
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
