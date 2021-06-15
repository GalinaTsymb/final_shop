import {
    FETCH_Cat_STARTED,
    FETCH_Cat_FAILURE,
    FETCH_Cat_SUCCESS

} from "./types";

import ApiService from "../../services/apiServices";


const loadCategoriesSuccess = (categories) => ({
    type: FETCH_Cat_SUCCESS,
    payload: [
        ...categories,
    ],
});
const loadCategoriesStarted = () => ({
    type: FETCH_Cat_STARTED,
});

const loadCategoriesFailure = () => ({
    type: FETCH_Cat_FAILURE,
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



