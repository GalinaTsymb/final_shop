import React, {useEffect, useState} from 'react';
import ListGroup from "react-bootstrap/ListGroup";
import {loadCategories} from '../store/actions/categories';
import {loadProducts} from "../store/actions/products";
import {useDispatch, useSelector} from "react-redux";


const CategoriesBar = () => {

    const dispatch = useDispatch();

    const { categories, fetchingCategories, categoriesError } = useSelector(
        state => state.categories
    );
    const allProducts = 0;

    let [isActive, setIsActive] = useState(allProducts);

    const handleClickAllproducts = () => {
        setIsActive(isActive = allProducts);
        dispatch(loadProducts(allProducts));
    };

    const handleClickCategory = (event) => {
        setIsActive(isActive =  event.target.id);
        dispatch(loadProducts(event.target.id));
    };

    useEffect(() => {
        dispatch(loadCategories());
    }, [ dispatch]);

    return (
        <ListGroup as="ul">
            <ListGroup.Item as="li"
                            className="btn btn-outline-secondary ts_secondary_color ts_cursor mt-1 text-center"
                            onClick={handleClickAllproducts}
                            key={allProducts}
                            active={allProducts === +isActive}>
                Все товары
            </ListGroup.Item>
            <span className="mb-1 text-center ts_main_color">Категории</span>
            {!categoriesError && !fetchingCategories && categories && (
                <>
                    {categories.map(item => {
                        return (
                            <ListGroup.Item as="li"
                                            className="ts_category_item ts_cursor"
                                            onClick={handleClickCategory}
                                            key={item.name_category}
                                            id={item.id_category}
                                            active={item.id_category === +isActive}
                                            >
                                    {item.name_category}
                            </ListGroup.Item>

                        );
                    })}
                </>
            )}
        </ListGroup>
    );
};

export default CategoriesBar;
