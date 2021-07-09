import React from 'react';


const Checkout = (props) => {
    return (
        <div className="checkout-steps">
            <div className={props.step1 ? 'active' : ''} >Ваши данные</div>
            <div className={props.step2 ? 'active' : ''} >Оплата</div>
            <div className={props.step3 ? 'active' : ''} >Доставка</div>
            <div className={props.step4 ? 'active' : ''} >Заказ</div>
        </div>
    );
};

export default Checkout;
