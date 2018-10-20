import { connect } from "react-redux";
import FoodDisplayComponent from "./display.jsx";

const mapStateToProps = state => {
	return {
		food: state.food
	};
};

const FoodContainer = connect(mapStateToProps)(FoodDisplayComponent);

export default FoodContainer;
