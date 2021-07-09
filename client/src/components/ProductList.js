import React, {useEffect} from 'react';
import Row from "react-bootstrap/Row";
import {useDispatch, useSelector} from "react-redux";
import ProductItem from "./ProductItem";
import {getProductImageUrl} from "../utils/consts";
import {loadProducts} from "../store/actions/productActions";
import Loading from "./Loading";


const ProductList = () => {
    const dispatch = useDispatch();

    const { loading, results } = useSelector(state => state.productList);

    useEffect(() => {
        dispatch(loadProducts(1));
    }, [dispatch]);


    return (
        <>
            {loading ? <Loading/> :

                <Row className="d-flex justify-content-between">

                    { results && results.length >= 0 && (results.map(product => {
                    const cloneItem = {...product};

                    cloneItem.imgSrc = getProductImageUrl(product.image);

                    return (
                    <ProductItem key={product.id_prod} product={cloneItem}/>
                    )
                }))
                    }
                </Row>
            }
        </>
    );
};

export default ProductList;
