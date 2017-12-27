import {
	combineReducers
} from 'redux'

function foodGroupIds(state = {}, action) {
	switch (action.type) {
		case 'ADD_FG_ID_INDEX':
			return Object.assign({}, action.foodGroupIndex)
		case 'ADD_FG_NAME_INDEX':
			return Object.assign({}, action.foodGroupIndex)
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
	indexTags
})

export default rootReducer;
