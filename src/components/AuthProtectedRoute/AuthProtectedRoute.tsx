import {Redirect, Route} from "react-router-dom";
import React from "react";
import {useSelector} from "../../services/types/hooks";


type TProps = {
    children: React.ReactNode,
    path: string
};

export const AuthProtectedRoute = ({children, ...rest}: TProps) => {
    const {isAuth} = useSelector(store => store.authReducer);
    return (
        <Route {...rest} render={() => isAuth? (<Redirect to='/' />) : (children)} />
    )
}