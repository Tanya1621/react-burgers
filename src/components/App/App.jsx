import AppHeader from "../AppHeader/appHeader";
import {useEffect} from 'react';
import React from 'react';
import {getItems, UPDATE_AUTH} from "../../services/actions";
import {useDispatch} from "react-redux";
import {Switch, Route, useLocation} from 'react-router-dom';
import {RegistrationPage} from "../../pages/Registration/RegistartionPage";
import {ForgotPassword} from "../../pages/ForgotPassword/ForgotPassword";
import {MainPage} from "../../pages/MainPage/MainPage";
import {LoginPage} from "../../pages/LoginPage/LoginPage";
import {ResetPasswordPage} from "../../pages/ResetPasswordPage/ResetPasswordPage";
import {ProfilePage} from "../../pages/ProfilePage/ProfilePage";
import {IngredientPage} from "../../pages/IngredientPage/IngredientPage";
import {IngredientPopup} from "../../pages/IngredientPopup/IngredientPopup";
import {ProtectedRoute} from "../ProtectedRoute/ProtectedRoute";
import {AuthProtectedRoute} from "../AuthProtectedRoute/AuthProtectedRoute";
import {getUserData} from "../../services/api";


const App = () => {
    let location = useLocation();
    const dispatch = useDispatch();
    let background = location.state && location.state.background;
    useEffect(() => {
        dispatch(getItems());
        getUserData().then((res) => {
            if (res.success && res) {
                dispatch({type: UPDATE_AUTH, user: {name: res.user.name, email: res.user.email}})
            }
        });
    }, [dispatch])


    return (<>
            <AppHeader/>
            <Switch location={background || location}>
                <Route exact path='/' component={MainPage}/>
                <AuthProtectedRoute path='/register'>
                    <RegistrationPage/>
                </AuthProtectedRoute>
                <AuthProtectedRoute path='/login'>
                    <LoginPage/>
                </AuthProtectedRoute>
                <AuthProtectedRoute path='/forgot-password'>
                    <ForgotPassword/>
                </AuthProtectedRoute>
                <AuthProtectedRoute path='/reset-password'>
                    <ResetPasswordPage/>
                </AuthProtectedRoute>
                <ProtectedRoute path='/profile'>
                    <ProfilePage/>
                </ProtectedRoute>
                <Route exact path='/ingredients/:id' component={IngredientPage}/>
            </Switch>
            {background && <Route exact path='/ingredients/:id' component={IngredientPopup}/>}
        </>
    )
}

export default App;