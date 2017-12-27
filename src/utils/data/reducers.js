import {
	combineReducers
} from 'redux'

function foodGroupIds(state = {
	nameIndex: {},
	idIndex: {}
}, action) {
	switch (action.type) {
		case 'ADD_FG_ID_INDEX':
			state.idIndex = action.foodGroupIndex;
			return state;
		case 'ADD_FG_NAME_INDEX':
			state.nameIndex = action.foodGroupIndex;;
			return state;
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
			state.indices = action.indices;
			return state;
		case 'ADD_FOOD_DATA':
			state.data = action.foodData;;
			return state;
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
	indexTags
})

export default rootReducer;
