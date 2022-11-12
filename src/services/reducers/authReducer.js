import {
    AUTHORIZATION_FAILED,
    AUTHORIZATION_REQUEST,
    AUTHORIZATION_SUCCESS, LOGOUT_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    REGISTRATION_SUCCESS, REGISTRATION_FAILED, REGISTRATION_REQUEST, UPDATE_USER_INFO, UPDATE_AUTH
} from "../actions";

const initialState = {
    id: null,
    name: '',
    email: '',
    isAuth: false,
    token: '',
    authRequest: false,
    logoutRequest: false,
    logoutFailed: false,
    authFailed: false,
    regRequest: true,
    refreshToken: '',
    regFailed: false
}


export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_INFO: {
            return {...state, name: action.user.name, email: action.user.email}
        }
        case UPDATE_AUTH: {
            return {...state, isAuth: true, name: action.user.name, email: action.user.emai }
        }
        case REGISTRATION_REQUEST:
            return {...state, regRequest: true};
        case REGISTRATION_SUCCESS:
            return {
                ...state,
                regRequest: false,
                name: action.user.name,
                email: action.user.email,
                isAuth: true,
                token: action.token,
                refreshToken: action.refreshToken,
            };
        case REGISTRATION_FAILED:
            return {...state,regRequest: false, regFailed: true }
        case AUTHORIZATION_REQUEST:
            return {...state, authRequest: true}
        case AUTHORIZATION_SUCCESS:
            return {
                ...state,
                authRequest: false,
                name: action.user.name,
                email: action.user.email,
                isAuth: true,
                token: action.token
            };
        case AUTHORIZATION_FAILED:
            return {...state, authFailed: true, authRequest: false};
        case LOGOUT_REQUEST:
            return {...state, logoutRequest: true};
        case LOGOUT_SUCCESS:
            return {...state, logoutRequest: false, name: '', email: '', isAuth: false, token: '', refreshToken: ''};
        case LOGOUT_FAILED:
            return {...state, logoutRequest: false, logoutFailed: true};
        default:
            return state;
    }

}