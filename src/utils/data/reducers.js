import {
	combineReducers
} from 'redux'

function food(state = {
	indices: {},
	data: {}
}, action) {
	switch (action.type) {
		case 'ADD_INDEXED_FOODS':
			return Object.assign({}, state, {
				indices: action.indices
			});
		case 'ADD_FOOD_DATA':
			return Object.assign({}, state, {
				data: action.foodData
			});
		default:
			return state;
	}
}

function indexTags(state = {}, action) {
	switch (action.type) {
		case 'INDEX_BY_TAGS':
			return Object.assign({}, action.resources)
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	food,
	indexTags
})

export default rootReducer;
