import { connect } from 'react-redux'
import NestedSelectField from './NestedSelectField.jsx'

const mapStateToProps = state => {
  return {
    selectObject: state.food.indices,
    allFoodData: state.food.data
  }
}

const NestedSelectContainer = connect(
  mapStateToProps
)(NestedSelectField)

export default NestedSelectContainer