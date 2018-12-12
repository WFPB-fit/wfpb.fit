import React, { Component } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import styled from "styled-components";

import Header from "./components/header";
import Footer from "./components/footer";

import Home from "./routes/home.jsx";
import HowTo from "./routes/how-to.jsx";
import Data from "./routes/food.jsx";
import ResearchContainer from "./routes/research_container.jsx";
import LearnMore from "./routes/learn-more";
import Endorsements from "./routes/endorsements";
import Support from "./routes/support";

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
import withWindowDimensions from "./components/withWindowSize/index.jsx";

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
	typography: {
		htmlFontSize: 14,
		useNextVariants: true
	},
	palette: {
		// type: 'dark',
		primary: blue,
		secondary: orange
	}
});

const appRoutes = [
	{ path: "/", txt: "Home", component: Home, exact: true },
	{ path: "/research", txt: "Research", component: ResearchContainer },
	{ path: "/data", txt: "Data", component: Data },
	{ path: "/endorsements", txt: "Endorsements", component: Endorsements },
	{ path: "/media", txt: "Media", component: LearnMore },
	{ path: "/how-to", txt: "How-To", component: HowTo },
	{ path: "/support", txt: "Support", component: Support }
];

class App extends Component {
	constructor(props) {
		super(props);

		//simple global data container
		window.globalAppData = {
			appName: "WFPB.fit",
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
							<Header appRoutes={appRoutes} />
							<Body>
								<Switch>
									{appRoutes.map(x => {
										return (
											<Route
												key={x.path}
												exact={x.exact}
												path={x.path}
												component={x.component}
											/>
										);
									})}
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

export default withWindowDimensions(App);
