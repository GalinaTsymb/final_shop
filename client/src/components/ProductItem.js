import React from 'react';
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import {Link} from "react-router-dom";
import {PRODUCT_ROUTE} from "../utils/consts";

const ProductItem = ({product}) => {
    return (

            <Col className="mt-3">
                <Card style={{ width: '15rem' }} className="p-3 text-center ts_hover" border={"light"}>
                    <Link to={'/product/' + product.id_prod}>
                        <Image style={{ width: '10rem', height: '10rem' }} className="ts_cursor ts_hover" src={product.imgSrc}/>
                    </Link>
                    <div className="ts_main_color ts_cursor mt-1 d-flex justify-content-between align-items-center">
                        <Link to={PRODUCT_ROUTE+ "/" + product.id_prod}>{product.name_prod}</Link>
                    </div>
                    <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                        <div><strong>{product.price_prod} грн</strong></div>
                    </div>
                </Card>
            </Col>

    );
};

export default ProductItem;
