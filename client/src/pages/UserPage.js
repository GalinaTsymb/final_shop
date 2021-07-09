import React from 'react';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import UserProfile from "../components/UserProfile";
import Orders from "../components/Orders";
import {useSelector} from "react-redux";
import Error from "../components/Error";

const UserPage = () => {
    const {errorProfile} = useSelector(state => state.userProfile);
    const {loadingError} = useSelector(state => state.order);

    return (
        <>
            { loadingError || errorProfile ? <Error/> :

                <Container className="flex-grow-1 flex-shrink-1">
                    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mt-5">
                        <Tab eventKey="home" className="" title="Информация">
                            <UserProfile />
                        </Tab>
                        <Tab eventKey="profile" className="" title="Мои заказы">
                            <Orders />
                        </Tab>
                    </Tabs>
                </Container>
            }
        </>
    );
};

export default UserPage;
