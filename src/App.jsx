import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';

// import logo from './logo.svg';
// import './App.css';
import Header from './components/header/index';
import Home from './routes/home/index';

export default class App extends Component {

	render() {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Route exact path="/" component={Home} />
				</Router>
			</div>
		);
	}
	// render() {
	//   return (
	//     <div className="App">
	//       <header className="App-header">
	//         <img src={logo} className="App-logo" alt="logo" />
	//         <h1 className="App-title">Welcome to React</h1>
	//       </header>
	//       <p className="App-intro">
	//         To get started, edit <code>src/App.js</code> and save to reload.
	//       </p>
	//     </div>
	//   );
	// }
}

