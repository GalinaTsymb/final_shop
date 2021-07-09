import React, {useEffect, useState} from 'react';
import ListGroup from "react-bootstrap/ListGroup";
import {changeCategory, loadCategories} from '../store/actions/categoryActions';
import {loadProducts} from "../store/actions/productActions";
import {useDispatch, useSelector} from "react-redux";
import {idAllproducts} from "../utils/consts";
import Loading from "./Loading";


const CategoriesBar = () => {

    const dispatch = useDispatch();

    const { categories, loadingCateg } = useSelector(state => state.category );

    let [isActive, setIsActive] = useState(idAllproducts);

    const handleClickAllproducts = () => {
        setIsActive(isActive = idAllproducts);
        dispatch(loadProducts(1, idAllproducts));
        dispatch(changeCategory(idAllproducts));
    };

    const handleClickCategory = (event) => {
        setIsActive(isActive =  event.target.id);
        dispatch(loadProducts(1, event.target.id));
        dispatch(changeCategory(event.target.id));
    };

    useEffect(() => {
        dispatch(loadCategories());
    }, [ dispatch]);

    return (
        <>
        { loadingCateg ? <Loading/> :
            <ListGroup as="ul">
                <ListGroup.Item as="li"
                                className="btn btn-outline-secondary ts_secondary_color p-1 text-center"
                                onClick={handleClickAllproducts}
                                key={idAllproducts}
                                active={idAllproducts === +isActive}>
                    Все товары
                </ListGroup.Item>
                <span className="mb-1 text-center ts_main_color mt-3 mb-1">Категории</span>
                { categories && (
                    <>
                        {categories.map(item => {
                            return (
                                <ListGroup.Item as="li"
                                                className="ts_cursor p-2 text-center"
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
            </ListGroup>}
    </>);
};

export default CategoriesBar;
