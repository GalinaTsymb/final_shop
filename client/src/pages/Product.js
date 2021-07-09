import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import {CART_ROUTE, getProductImageUrl} from "../utils/consts";
import {detailsProduct} from "../store/actions/productActions";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {CSSTransition} from "react-transition-group";
import {loadPayments} from "../store/actions/paymentActions";
import {loadDelivery} from "../store/actions/deliveryActions";
import Error from "../components/Error";
import Loading from "../components/Loading";

const Product = (props) => {

    const {product, loadingDetProd, errorDetProd}    = useSelector(state => state.productDetails);
    const {userInfo}                                 = useSelector(state => state.userLogin);
    const {payments, loadingPayment, errorPayment}   = useSelector(state => state.payment);
    const {delivery, loadingDelivery, errorDelivery} = useSelector(state => state.delivery);

    const dispatch          = useDispatch();
    const [show, setShow]   = useState(false);

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        dispatch(loadPayments());
        dispatch(loadDelivery())
    }, [props.match.params.id, dispatch]);

    const handleAddToCart = () => {
        props.history.push(CART_ROUTE + "/" + props.match.params.id);
    };

    return (
        <Container className="mt-3 flex-grow-1 flex-shrink-1">
            { loadingDetProd  ? <Loading /> : errorDetProd  ? <Error /> : (
                <>
                    <Link to="/">Назад в магазин</Link>

                    { product && (
                        <>
                            <Row className="mt-2">
                                <Col md={6}>
                                    <Image width={200} height={200} src={getProductImageUrl(product.image)} alt="product" />
                                </Col>
                                <Col md={6}>
                                    <Row className="d-flex flex-column">
                                        <h2 className="ts_name position-relative"><span className="d-block ts_size_14 mb-2">Футболка</span><span className="mb-2 ts_size_20 d-block">{product.name_prod}</span></h2>
                                        <div className="ts_size mb-2 mt-2"><span className="ts_text">Размер:</span> <span>{product.name_size}</span></div>
                                        <div className="ts_color">
                                            <span className="ts_text">Цвет:</span>
                                            <span style={{background: `${product.name_color}`}}></span>
                                        </div>
                                        <div className="mb-2 mt-2 ts_text">Код товара: <strong>{product.id_prod}</strong></div>
                                        <div className="mb-3">
                                            {product.available > 0 ? <span className="ts_yes">В наличии</span>
                                                : <span className="ts_not">Нет в наличии</span>
                                            }
                                        </div>
                                        <div>
                                            {userInfo ?
                                                <Button variant="success" onClick={handleAddToCart} disabled={product.available <= 0}>В корзину</Button>
                                                :
                                                <>
                                                    <Button disabled={product.available <= 0} variant="success" onClick={ () => setShow(!show)}>В корзину</Button>
                                                    <CSSTransition  in={show} timeout={200} classNames='alert' unmountOnExit>
                                                        <Button key={1} onClick={ () => setShow(false)} className="ml-1 position-absolute btn-danger"> Необходимо авторизоваться или зарегистрироваться</Button>
                                                    </CSSTransition>
                                                </>
                                            }
                                            <span className="ts_price">{product.price_prod}</span>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mt-2">
                                        <Tab eventKey="home" className="p-3" title="Подробнее о товаре">
                                            <div>
                                                <div className="ts_text">Футболка {product.name_type}</div>
                                                <div className="ts_text">Состав: {product.name_structure}</div>
                                                <div className="mt-1 ts_text">{product.description_product}</div>
                                                <div>
                                                    <h3><strong>Правила ухода</strong></h3>
                                                    <p className="ts_text">{product.care_rules}</p>
                                                </div>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="profile" title="Наши гарантии">
                                            <ul className="ts_tab_warranty d-flex flex-row justify-content-between pt-3 pb-3">
                                                <li className="mr-5 text-center p-2">
                                                    <h4 className="ts_tab_title mb-3">Гарантия качества</h4>
                                                    <p className="ts_text">Собственный отдел контроля качества просматривает и проверяет каждый произведенный предмет
                                                        перед отправкой.</p>
                                                </li>
                                                <li className="mr-5 text-center p-2">
                                                    <h4 className="ts_tab_title mb-3">Защита персональных данных</h4>
                                                    <p className="ts_text">Вся контактная информация, которую наши покупатели оставляют на сайте,
                                                        строго конфиденциальна. Вы можете быть уверены в надежной защите ваших персональных данных.</p>
                                                    <img  alt="Protection of personal information" src='../secur.jpg'/>
                                                </li>
                                                <li className="text-center p-2">
                                                    <h4 className="ts_tab_title mb-3 ">Доставка по всей Украине</h4>
                                                    <p className="ts_text">Мы доставим ваш заказ в любую точку Украины! Мы работаем только с лучшей транспортной
                                                        компанией - Новая почта</p>
                                                    <img className="mt-5"  alt="logo nova post" src='../nova-post.jpg'/>
                                                </li>
                                            </ul>
                                        </Tab>
                                        <Tab eventKey="contact" title="Оплата и доставка">
                                           <h2 className="text-center mt-2">Оплата и доставка</h2>
                                            <Row>
                                                <Col md={6}>
                                                    <h3 className="text-center">Оплата заказа</h3>
                                                    <ul className="p-3">
                                                    {loadingPayment ? (<div>Loading...</div>) : errorPayment ? (<div>{errorPayment}</div>) : (
                                                        payments.map(payment => {
                                                            const cloneItem = {...payment};
                                                            cloneItem.imgSrc = getProductImageUrl(payment.image);

                                                            return(
                                                                <li className="mb-5" key={cloneItem.id_payment}>
                                                                    <div className="d-flex justify-content-around align-items-center">
                                                                        <img className="w-25" src={cloneItem.imgSrc} alt="logo"/>
                                                                        <h4>{cloneItem.name}</h4>
                                                                    </div>
                                                                    <p className="text-center p-2">{cloneItem.description_payment}</p>
                                                                </li>
                                                            )
                                                        })
                                                    )}
                                                    </ul>
                                                </Col>
                                                <Col md={6}>
                                                    <h3 className="text-center">Доставка заказов</h3>
                                                    <p className="text-center font-italic">
                                                        Изготовление заказа начинается с момента получения заявки.<br/>
                                                        Срок обработки заявки до 2-х дней.<br/>
                                                        Все заказы отправляются ежедневно (в рабочие дни).
                                                    </p>
                                                    <ul className="p-3">
                                                        {loadingDelivery ? (<div>Loading...</div>) : errorDelivery ? (<div>{errorDelivery}</div>) : (
                                                            delivery.map(del => {
                                                                const cloneItem = {...del};
                                                                cloneItem.imgSrc = getProductImageUrl(del.image);

                                                                return(
                                                                    <li className="mb-5" key={cloneItem.id_delivery}>
                                                                        <div className="d-flex justify-content-around align-items-center">
                                                                            <img className="w-25" src={cloneItem.imgSrc} alt="logo"/>
                                                                            <h4>{cloneItem.name_delivery}</h4>
                                                                        </div>
                                                                        <p className="text-center p-2">{cloneItem.description}</p>
                                                                        <p>Стоимость доставки: <span>{cloneItem.price_delivery}</span>грн</p>
                                                                    </li>
                                                                )
                                                            })
                                                        )}
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </Tab>
                                    </Tabs>
                                </Col>
                            </Row>
                        </>
                    )}
                </>
            )}
        </Container>
    );
};

export default Product;
