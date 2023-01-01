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
import {AllOrdersPage} from "../../pages/AllOrdersPage/AllOrdersPage";
import {ProfileOrdersPage} from "../../pages/ProfileOrders/ProfileOrders";
import {OrdersPopup} from "../../pages/OrdersPopup/OrdersPopup";
import OrderPage from "../../pages/OrderPage/OrderPage";
import {ProfileInfo} from "../../pages/ProfileInfo/ProfileInfo";
import {Location} from "history";

// interface TLocation extends Location {
//     state: {
//         background?: string
//     }
// }

const App = () => {
    let location = useLocation() as Location<{background?: string}>;
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
                <Route exact path='/feed' component={AllOrdersPage}/>
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
                    <ProfilePage>
                        <Route exact path='/profile/' component={ProfileInfo}/>
                        <Route exact path='/profile/order' component={ProfileOrdersPage}/>
                    </ProfilePage>
                </ProtectedRoute>
                <Route exact path='/ingredients/:id' component={IngredientPage}/>
                <Route exact path='/feed/:id' component={OrderPage}/>
                <Route exact path='/orders/:id' component={OrderPage}/>
            </Switch>
            {background && <Route exact path='/ingredients/:id' component={IngredientPopup}/>}
            {background && <Route exact path='/feed/:id' component={OrdersPopup}/>}
            {background && <Route exact path='/orders/:id' component={OrdersPopup}/>}
        </>
    )
}

export default App;