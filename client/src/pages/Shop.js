import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductList from "../components/ProductList";
import CategoriesBar from "../components/CategoriesBar";
import {useDispatch, useSelector} from "react-redux";
import Error from "../components/Error";
import Pagination from "react-bootstrap/Pagination";
import {loadProducts} from "../store/actions/productActions";


const Shop = () => {
    const dispatch = useDispatch();
    const { next, previous, loadingError } = useSelector(state => state.productList);
    const { errorCateg, changeCategory }   = useSelector(state => state.category  );


    const pageHandler = (event) => {
        const page = event.target.dataset.action;
        dispatch(loadProducts(page, parseInt(changeCategory)));
    };

    return (
        <>
            { loadingError || errorCateg  ? (<Error/>) : (
            <>
                <Container className="mt-4 flex-grow-1 flex-shrink-1">
                    <Row >
                        <Col md={3}>
                           <CategoriesBar/>
                        </Col>
                        <Col md={9} >
                            <ProductList/>
                        </Col>
                    </Row>
                </Container>
                <Pagination className="position-absolute ts_bottom">
                    { !previous ? <Pagination.Prev disabled /> : <Pagination.Prev />}
                    { previous && previous.page > 1 ? <Pagination.Ellipsis /> : ''}
                    { previous  ? <Pagination.Item data-action={previous.page} onClick={pageHandler}>{previous.page}</Pagination.Item> : ''}
                    { next      ? <Pagination.Item data-action={next.page-1}  onClick={pageHandler} active>{next.page-1 }</Pagination.Item> : previous ? <Pagination.Item active>{previous.page + 1 }</Pagination.Item> : <Pagination.Item active>1</Pagination.Item> }
                    { next      ? <Pagination.Item data-action={next.page}  onClick={pageHandler}>{next.page}</Pagination.Item> : ''}
                    { next ? <Pagination.Ellipsis /> : ''}
                    {!next ? <Pagination.Next disabled /> : <Pagination.Next />}
                </Pagination>
            </>
            )}
        </>
    );
};

export default Shop;
