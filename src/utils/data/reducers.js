import {
	combineReducers
} from 'redux'

function foodGroupIds(state = {
	nameIndex: {},
	idIndex: {}
}, action) {
	switch (action.type) {
		case 'ADD_FG_ID_INDEX':
			return Object.assign({}, state, {
				idIndex: action.foodGroupIndex
			});
		case 'ADD_FG_NAME_INDEX':
			return Object.assign({}, state, {
				nameIndex: action.foodGroupIndex
			});
		default:
			return state;
	}
}

function importantNutrients(state = {
	data: {}
}, action) {
	switch (action.type) {
		case 'ADD_IMPORTANT_NUTRIENTS':
			return Object.assign({}, state, {
				data: action.data
			});
		default:
			return state;
	}
}

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
	foodGroupIds,
	food,
	importantNutrients,
	indexTags
})

export default rootReducer;
