import React from 'react';
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { useHistory } from 'react-router-dom';
import {PRODUCT_ROUTE} from "../utils/consts";

const ProductItem = ({product}) => {
    const history = useHistory();
    return (
        <div>
            <Col md={3} className="mt-3" onClick={() => history.push(PRODUCT_ROUTE + '/' + product.id_prod)}>
                <Card className="ts_cart" border={"light"}>
                    <Image className="ts_cart_img ts_cursor" src={product.imgSrc}/>
                    <div className="ts_main_color ts_cursor mt-1 d-flex justify-content-between align-items-center">
                        <div>{product.name_prod}</div>
                    </div>
                    <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                        <div><strong>{product.price_prod}</strong></div>
                    </div>
                </Card>
            </Col>
        </div>
    );
};

export default ProductItem;
