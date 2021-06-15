import {
    FETCH_Cat_STARTED,
    FETCH_Cat_FAILURE,
    FETCH_Cat_SUCCESS
} from "../actions/types";

export default function reducer(state = {
                                categories: null,
                                fetchingCategories: false,
                                categoriesError: false, }, action) {
    switch (action.type) {
        case FETCH_Cat_STARTED: {
            return { ...state, fetchingCategories: true, categoriesError: false};
        }
        case FETCH_Cat_FAILURE: {
            return { ...state, fetchingCategories: false, categoriesError: true};
        }
        case FETCH_Cat_SUCCESS: {
            return { ...state, fetchingCategories: false, categories: action.payload};
        }
        default:
            return state;
    }
}
