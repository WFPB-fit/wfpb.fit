import { combineReducers } from "redux";
import { alphaCompare } from "../GeneralUtils.jsx";

// -------- Create React-Select search options - https://github.com/bvaughn/react-select-fast-filter-options --------
// import {
// 	SimpleTokenizer,
// 	StemmingTokenizer
// } from 'js-search';
// import { stemmer } from 'porter-stemmer';
// const porterStemmerTokenizer = new StemmingTokenizer(stemmer, new SimpleTokenizer())
// import createFilterOptions from "react-select-fast-filter-options";

function _getAllSelectables(foodData) {
	return Object.keys(foodData)
		.map(id => {
			return {
				value: id,
				label: foodData[id].name
			};
		})
		.sort(alphaCompare);
}

function food(
	state = {
		indices: {},
		data: {}
	},
	action
) {
	switch (action.type) {
		case "ADD_INDEXED_FOODS":
			return Object.assign({}, state, {
				indices: action.indices
			});
		case "ADD_FOOD_DATA":
			const selectables = _getAllSelectables(action.foodData);
			return Object.assign({}, state, {
				data: action.foodData,
				allSelectables: selectables,
				// filterOptions: createFilterOptions({
				// 	options: selectables
				// 	// tokenizer: porterStemmerTokenizer,
				// })
			});
		case "ADD_FOOD_COLORS":
			return Object.assign({}, state, {
				foodColors: action.foodColors
			});
		default:
			return state;
	}
}

function studies(
	state = {
		metaData: {},
		text: {}
	},
	action
) {
	switch (action.type) {
		case "ADD_STUDIES_METADATA":
			return Object.assign({}, state, {
				studies_metadata: action.data
			});
		case "ADD_STUDIES_TEXT":
			return Object.assign({}, state, {
				studies_text: action.data
			});
		default:
			return state;
	}
}

function indexTags(state = {}, action) {
	switch (action.type) {
		case "INDEX_BY_TAGS":
			return Object.assign({}, action.resources);
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	food,
	indexTags,
	studies
});

export default rootReducer;
