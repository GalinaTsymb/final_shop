import {
    CATEGORY_STARTED,
    CATEGORY_FAILURE,
    CATEGORY_SUCCESS,
    CHANGE_CATEGORY

} from "./types";

import ApiService from "../../services/apiServices";


const loadCategoriesSuccess = (categories) => ({
    type: CATEGORY_SUCCESS,
    payload: [
        ...categories,
    ],
});
const loadCategoriesStarted = () => ({
    type: CATEGORY_STARTED,
});

const loadCategoriesFailure = () => ({
    type: CATEGORY_FAILURE,
});



export const loadCategories = () => async (dispatch) => {
    dispatch(loadCategoriesStarted());
    try {
        const categories = await ApiService.getCategories()
            .then((res) => res.json());

        dispatch(loadCategoriesSuccess(categories));

    } catch {
        dispatch(loadCategoriesFailure());
    }
};
export const changeCategory = (id_category) => (dispatch) => {
    dispatch({type: CHANGE_CATEGORY, payload: id_category});
};
