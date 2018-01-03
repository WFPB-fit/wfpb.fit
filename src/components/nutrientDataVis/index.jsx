import { connect } from 'react-redux'
import FoodComponent from './display.jsx'
import { alphaCompare } from '../../utils/GeneralUtils.jsx';


const getAllSelectables = (foodData) => {
  return Object.keys(foodData)
    .map(id => {
      return { value: id, label: foodData[id].name };
    })
    .sort(alphaCompare);
}

const mapStateToProps = state => {
  return {
    foodData: state.food.data,
    allSelectables: getAllSelectables(state.food.data)
  }
}

const FoodContainer = connect(
  mapStateToProps
)(FoodComponent)

export default FoodContainer