import { Component } from "react";

export default function withWindowDimensions(WrappedComponent) {
	return class extends Component {
		constructor(props) {
			super(props);
			this.state = { width: 0, height: 0 };
			this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		}

		componentDidMount() {
			this.updateWindowDimensions();
			window.addEventListener("resize", this.updateWindowDimensions);
		}

		componentWillUnmount() {
			window.removeEventListener("resize", this.updateWindowDimensions);
		}

		updateWindowDimensions() {
			this.setState({ width: window.innerWidth, height: window.innerHeight });
		}

		render() {
			return <WrappedComponent windowWidth = {this.state.width} windowHeight={this.state.height}/>;
		}
	};
}
