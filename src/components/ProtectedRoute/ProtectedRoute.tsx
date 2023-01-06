import {Redirect, Route} from "react-router-dom";
import React from "react";
import {getUserData} from "../../services/api";
import {UPDATE_AUTH} from "../../services/actions";
import {useEffect} from "react";
import {TChildren} from "../../services/types/types";
import {useDispatch, useSelector} from "../../services/types/hooks";

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