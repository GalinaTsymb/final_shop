import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CategoriesBar from "../components/CategoriesBar";
import ProductList from "../components/ProductList";

const Shop = () => {

    return (
        <Container className="mt-4">
            <Row>
                <Col md={3}>
                    <CategoriesBar/>
                </Col>
                <Col md={9}>
                  <ProductList/>
                </Col>
            </Row>

        </Container>
    );
};

export default Shop;
