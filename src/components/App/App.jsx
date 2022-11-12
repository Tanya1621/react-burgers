import AppHeader from "../AppHeader/appHeader";
import {useEffect} from 'react';
import React from 'react';
import {getItems} from "../../services/actions";
import {useDispatch} from "react-redux";
import { Switch, Route, useLocation} from 'react-router-dom';
import {RegistrationPage} from "../pages/Registration/RegistartionPage";
import {ForgotPassword} from "../pages/ForgotPassword/ForgotPassword";

import {MainPage} from "../pages/MainPage/MainPage";
import {LoginPage} from "../pages/LoginPage/LoginPage";
import {ResetPasswordPage} from "../pages/ResetPasswordPage/ResetPasswordPage";
import {ProfilePage} from "../pages/ProfilePage/ProfilePage";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {IngredientPage} from "../pages/IngredientPage/IngredientPage";
import {IngredientPopup} from "../pages/IngredientPopup/IngredientPopup";


const App = () => {
    let location = useLocation();
    const dispatch = useDispatch();
    let background = location.state && location.state.background;
    useEffect(() => {
        dispatch(getItems());
    }, [dispatch])


    return (<>
                <AppHeader/>
            <Switch location={background || location}>
                <Route exact path='/' component={MainPage}/>
                <Route exact path='/register' component={RegistrationPage}/>
                <Route exact path='/login' component={LoginPage}/>
                <Route exact path='/forgot-password' component={ForgotPassword}/>
                <Route exact path='/reset-password' component={ResetPasswordPage}/>
                <Route exact path='/profile' component={ProfilePage}/>
                <Route exact path='/ingredients/:id' component={IngredientPage}/>
            </Switch>
            {background && <Route exact path='/ingredients/:id' component={IngredientPopup} />}
    </>)
}

export default App;