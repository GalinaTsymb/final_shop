import React, {useState} from 'react';
import Alert from "react-bootstrap/Alert";


const Message = (props) => {
    const message = props.message;
    const [show, setShow] = useState(true);
    return (
        <>
            <Alert show={show}  variant="danger" onClose={setTimeout(() => setShow(false), 3000)}>
                <Alert.Heading className="ts_size_14">{message}</Alert.Heading>
            </Alert>

        </>
    );
};

export default Message;
