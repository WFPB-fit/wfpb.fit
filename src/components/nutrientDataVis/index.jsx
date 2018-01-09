import { connect } from 'react-redux'
import FoodComponent from './display.jsx'

const mapStateToProps = state => {
  return {
    food: state.food
  }
}

const FoodContainer = connect(
  mapStateToProps
)(FoodComponent)

export default FoodContainer