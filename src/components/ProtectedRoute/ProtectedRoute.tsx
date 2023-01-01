import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import React from "react";
import {getUserData} from "../../services/api";
import {UPDATE_AUTH} from "../../services/actions";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import type {TChildren} from "../../pages/types";

export const ProtectedRoute = ({children, ...rest}: TChildren) => {
    let isLoading = false;
    const dispatch = useDispatch();
    useEffect(() => {
        getUserData().then((res) => {
            if (res.success && res) {
                dispatch({type: UPDATE_AUTH, user: {name: res.user.name, email: res.user.email}});
            }
        });
    }, [])
    const {isAuth} = useSelector(store => store.authReducer);
    return (
        isLoading? <p>Loading...</p> : <Route {...rest} render={() => isAuth ? (children) : (<Redirect to='/login'/>)}/>
    )
}