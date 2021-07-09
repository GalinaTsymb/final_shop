import React from 'react';
import {useAccordionToggle} from "react-bootstrap";
import {getDetailsOrder} from "../store/actions/orderActions";
import {useDispatch} from "react-redux";

const Item = ({ children, eventKey }) => {
    const dispatch = useDispatch();

    const decoratedOnClick = useAccordionToggle(eventKey, () => dispatch(getDetailsOrder(eventKey)) );

    return (
        <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={decoratedOnClick}
        >
            {children}
        </button>
    );
};

export default Item;
