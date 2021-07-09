import React, {useEffect} from 'react';
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";


const Thanks = () => {

    const {order} = useSelector(state => state.order);

    return (
        <Container className="flex-grow-1 flex-shrink-1">
            <Row className="justify-content-md-center">
                <Jumbotron className="mt-5">
                    <h2 className="ts_ok">Та-дам</h2>
                    <p className="mt-4">Ваш заказ <strong><u className="ml-2 mr-2">№{order}</u></strong> принят. <br/>
                    Скоро с вами свяжется наш менеджер, а пока можете посмотреть другие товары на нашем сайте. <br/>
                    Информацию о заказе и его статусе можете посмотреть в своём профиле </p>
                    <div className="d-flex justify-content-between">
                        <Link to="SHOP_ROUTE" className="ml-2 ml-2 btn btn-secondary">Продолжить покупки</Link>
                        <Link to="/user" className="ml-2 ml-2 btn btn-secondary">Мой профиль</Link>
                    </div>
                </Jumbotron>
            </Row>
        </Container>
    );
};

export default Thanks;
