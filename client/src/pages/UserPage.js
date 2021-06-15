import React from 'react';
import {useSelector} from "react-redux";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import UserProfile from "../components/UserProfile";

const UserPage = (props) => {

    const {userInfo} = useSelector(
        state => state.userLogin
    );
    console.log('userpage', userInfo);

    return (
        <Container>
            <div>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="ts_tab">
                <Tab eventKey="home" className="ts_tab_item" title="Информация">
                    <UserProfile/>
                </Tab>
                <Tab eventKey="profile" className="ts_tab_item" title="Мои заказы">

                </Tab>

            </Tabs>
            </div>
        </Container>
    );
};

export default UserPage;
