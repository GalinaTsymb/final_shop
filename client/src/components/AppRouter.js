import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {authentificationRoutes, publicRoutes} from "../utils/routes";
import {SHOP_ROUTE} from "../utils/consts";
import { useSelector} from "react-redux";


/**
 * Logic: if a registered user work out routes - authentificationRoutes (routes.js)
 * if not - publicRoutes (routes.js)
 * @returns {*}
 * @constructor
 */

const AppRouter = () => {

    // shows whether the user is authorized or not
    const {userInfo} = useSelector(
        state => state.userLogin
    );

    return (
        <Switch>
            {
                userInfo && authentificationRoutes.map(({path, component}) =>
                <Route key={path} path={path} component={component} exact/>)
            }
            {
                publicRoutes.map(({path, component}) =>
                    <Route  key={path} path={path} component={component} exact/>)
            }
            <Redirect to={SHOP_ROUTE}/>
            
        </Switch>
    );
};

export default AppRouter;
