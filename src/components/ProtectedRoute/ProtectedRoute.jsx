import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import React from "react";

export const ProtectedRoute = ({children, ...rest}) => {
    const {isAuth} = useSelector(store => store.authReducer);
    return (
        <Route {...rest} render={() => isAuth ? (children) : (<Redirect to='/login'/>)}/>
    )
}