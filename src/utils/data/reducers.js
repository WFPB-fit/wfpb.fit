import {
	combineReducers
} from 'redux'

function foodGroupIds(state = {}, action) {
	switch (action.type) {
		case 'ADD_FG_ID_INDEX':
			let fgIdIndex = {};
			for (const [id, name] of action.foodGroups) {
				fgIdIndex[id] = name;
			}

			return Object.assign({}, fgIdIndex)
		case 'ADD_FG_NAME_INDEX':
			let fgNameIndex = {};
			for (const [id, name] of action.foodGroups) {
				fgNameIndex[name] = id;
			}

			return Object.assign({}, fgNameIndex)
		default:
			return state;
	}
}

function indexTags(state = {}, action) {
	switch (action.type) {
		case 'INDEX_BY_TAGS':
			let fgIdIndex = {};
			for (const [id, name] of action.foodGroups) {
				fgIdIndex[id] = name;
			}

			return Object.assign({}, fgIdIndex)
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	foodGroupIds,
	indexTags
})

export default rootReducer;
