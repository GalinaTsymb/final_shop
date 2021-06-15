import React, {useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {authentificationRoutes, publicRoutes} from "../utils/routes";
import {SHOP_ROUTE} from "../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {checkAuthentication} from "../store/actions/user";

/**
 * Logic: if a registered user work out routes - authentificationRoutes (routes.js)
 * if not - publicRoutes (routes.js)
 * @returns {*}
 * @constructor
 */

const AppRouter = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(checkAuthentication());
    }, [dispatch]);

    // shows whether the user is authorized or not
    const {isAuthentication} = useSelector(
        state => state.userLogin
    );

    useEffect(() => {

    }, [isAuthentication]);

    return (
        <Switch>
            {
                isAuthentication && authentificationRoutes.map(({path, component}) =>
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
