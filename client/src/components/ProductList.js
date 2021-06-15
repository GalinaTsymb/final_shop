import React, {useEffect} from 'react';
import Row from "react-bootstrap/Row";
import ProductItem from "./ProductItem";
import {useDispatch, useSelector} from "react-redux";
import {loadProducts} from "../store/actions/products";
import {getProductImageUrl} from '../utils/consts';



const ProductList = () => {

    const dispatch = useDispatch();

    const { products, fetchingProducts, productsError } = useSelector(
        state => state.productList
    );


    useEffect(() => {
        dispatch(loadProducts());
    }, [dispatch]);
    return (

            <Row className="d-flex justify-content-between">
                {!fetchingProducts && !productsError && products && (
                    <>
                        {  products.map(product => {
                            const cloneItem = {...product};

                            cloneItem.imgSrc = getProductImageUrl(product.image);

                            return (
                                <ProductItem key={product.id_prod} product={cloneItem}/>
                            )
                        })
                        }
                    </>
                )}
            </Row>
    );
};

export default ProductList;
