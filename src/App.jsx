import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import styled from "styled-components";

import Header from "./components/header";
import Footer from "./components/footer";

import AppRoutes from "./utils/routes/appRoutes.js";

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

class App extends Component {
	constructor(props) {
		super(props);

		//simple global data container
		window.globalAppData = {
			appName: "WFPB.fit"
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
							<Header appRoutes={AppRoutes} />
							<Body>
								<Switch>
									{AppRoutes.map(x => {
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
