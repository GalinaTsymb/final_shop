import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {useDispatch, useSelector} from "react-redux";
import {detailsProduct} from "../store/actions/products";
import {CART_ROUTE, getProductImageUrl} from '../utils/consts';
import Button from "react-bootstrap/Button";
import {Link, useHistory} from "react-router-dom";
import {CSSTransition} from "react-transition-group";


const ProductSingle = (props)  => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {product, fetchingProductDetails, productsDetailsError} = useSelector(
        state => state.productDetails);

    const {isAuthentication} = useSelector(
        state => state.userLogin);

    const [show, setShow] = useState(false);
    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
    }, [dispatch]);

    const handleAddToCart = () =>{
        props.history.push(CART_ROUTE + '/' + props.match.params.id);
    };

    return (
       <Container className="mt-3">
           <Link to="/shop">Назад в магазин</Link>
           {!fetchingProductDetails && !productsDetailsError && product && (

               <>
           <Row className="ts_product_wrapper">

               <Col md={6}>
                   <Image width={300} height={300} src={getProductImageUrl(product[0].image)} />

               </Col>
               <Col md={6}>
                   <Row className="ts_product_text">
                       <h2 className="name"><span>Футболка</span><span>{product[0].name_prod}</span></h2>
                       <div className="size"><span>Размер:</span> <span>{product[0].name_size}</span></div>
                       <div className="color">
                           <span>Цвет:</span>
                           <span style={{background: `${product[0].name_color}`}}></span>
                       </div>
                       <div className="code">Код товара: <strong>{product[0].id_prod}</strong></div>
                       <div className="qty">
                           {product[0].available > 0 ? <span className="ts_yes">В наличии</span>
                               : <span className="ts_not">Нет в наличии</span>
                           }
                       </div>
                       <div>
                           {isAuthentication ?
                               <Button variant="success" onClick={handleAddToCart}>В корзину</Button>
                               :
                               <>
                               <Button variant="success" onClick={ () => setShow(!show)}>В корзину</Button>
                                   <CSSTransition  in={show} timeout={300} classNames='alert' unmountOnExit>
                                       <div key={1} className="ts_message"> Необходимо авторизоваться или зарегистрироваться</div>
                                   </CSSTransition>
                              </>
                           }
                           <span className="ts_price">{product[0].price_prod}</span>
                       </div>
                   </Row>
               </Col>
           </Row>
           <Row>
               <Col md={12}>
                   <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="ts_tab">
                       <Tab eventKey="home" className="ts_tab_item" title="Подробнее о товаре">
                           <div>
                               <div className="ts_tab_item__text">Футболка {product[0].name_type}</div>
                               <div className="ts_tab_item__text">Состав: {product[0].name_structure}</div>
                               <div className="ts_tab_item__desc ts_tab_item__text">{product[0].description_product}</div>
                               <div>
                                   <h3 className="ts_tab_item__title"><strong>Правила ухода</strong></h3>
                                   <p className="ts_tab_item__text">{product[0].care_rules}</p>
                               </div>
                           </div>
                       </Tab>
                       <Tab eventKey="profile" className="ts_tab_item" title="Наши гарантии">
                         <div>
                             <h4>Гарантия качества</h4>
                             <p>Собственный отдел контроля качества просматривает и проверяет каждый произведенный предмет
                                 перед отправкой.</p>
                         </div>
                           <div>
                               <h4>Финансовая безопасность</h4>
                               <p>При оплате товаров на сайте, все операции проходят через
                                   защищенный шлюз сервиса LiqPay, который гарантирует безопасность обработки интернет-платежей.</p>
                               <img/>
                           </div>
                           <div>
                               <h4>Защита персональных данных</h4>
                               <p>Вся контактная информация, которую наши покупатели оставляют на сайте,
                                   строго конфиденциальна. Вы можете быть уверены в надежной защите ваших персональных данных.</p>
                               <img/>
                           </div>
                           <div>
                               <h4>Доставка по всей Украине</h4>
                               <p>Мы доставим ваш заказ в любую точку Украины! Мы работаем только с лучшими транспортными
                                   компаниями и курьерскими</p>
                               <img/>
                           </div>
                       </Tab>
                       <Tab eventKey="contact" className="ts_tab_item" title="Оплата и доставка">
                           But do thy worst to steal thyself away, For term of life thou art assured mine; And life no longer than thy love will stay, For it depends upon that love of thine. Then need I not to fear the worst of wrongs, When in the least of them my life hath end. I see a better state to me belongs Than that which on thy humour doth depend: Thou canst not vex me with inconstant mind, Since that my life on thy revolt doth lie.

                       </Tab>
                   </Tabs>

               </Col>
           </Row>
               </>
           )}
       </Container>
    );
};

export default ProductSingle;
