import {
    CATEGORY_STARTED,
    CATEGORY_FAILURE,
    CATEGORY_SUCCESS,
    CHANGE_CATEGORY
} from "../actions/types";

function categoryReducer(state = {
    categories: null,
    loadingCateg: false,
    errorCateg: false,
    changeCategory: 0}, action) {
    switch (action.type) {
        case CATEGORY_STARTED: {
            return { ...state, loadingCateg: true, errorCateg: false};
        }
        case CATEGORY_SUCCESS: {
            return { ...state, loadingCateg: false, errorCateg: false, categories: action.payload};
        }
        case CATEGORY_FAILURE: {
            return { ...state, loadingCateg: false, errorCateg: true};
        }
        case CHANGE_CATEGORY: {
            return {...state, loadingCateg: false, errorCateg: false, changeCategory: action.payload};
        }
        default:
            return state;
    }
}

export {categoryReducer}
