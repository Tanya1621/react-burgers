import {
    AUTHORIZATION_URL,
    INGREDIENTS_URL,
    LOGOUT_URL,
    ORDER_URL,
    PASSWORD_RESET_URL,
    REGISTRATION_URL,
    RESTORE_PASSWORD_URL, TOKEN_URL, USER_INFO_URL,
} from "../utils/api";
import {getCookie, setCookie} from "../utils/cookie";

const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
}

export const getItemsRequest = async () => {
    return await fetch(INGREDIENTS_URL)
        .then((res) => checkResponse(res));
}

export const getOrderRequest = async (addedIngredients: string[]) => {
    return await fetch(ORDER_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: '' + getCookie('accessToken')
        },
        body: JSON.stringify({'ingredients': addedIngredients})
    })
        .then((res) => checkResponse(res));
}

export const restorePassword = async (email: string) => {
    return await fetch(RESTORE_PASSWORD_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'email': email})
    })
        .then((res) => checkResponse(res))

}

export const resetPassword = async (password: string, token: string) => {
    return await fetch(PASSWORD_RESET_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
            "password": password,
            "token": token
        })
    })
       .then((res) => checkResponse(res))
}

export const registerRequest = async (email: string, password: string, name: string) => {
    return await fetch(REGISTRATION_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
            "email": email,
            "password": password,
            "name": name
        })
    })
        .then((res) => checkResponse(res))
}

export const logoutRequest = async () => {
    return await fetch(LOGOUT_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
            'token': getCookie('refreshToken'),
        })
    })
        .then((res) => checkResponse(res))
}


export const authRequest = async (email: string, password: string) => {
    return await fetch(AUTHORIZATION_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
            "email": email,
            "password": password
        })
    })
        .then((res) => checkResponse(res))
}


export const updateInfoRequest = async (email: string, password: string, name: string) => {
    return await fetch(USER_INFO_URL, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': '' + getCookie('accessToken')
        },
        body: JSON.stringify( {
            "email": email,
            "name": name,
            "password": password
        })
    })
        .then((res) => checkResponse(res))
        .catch(err => {
            console.log('Error' + err.message);
            refreshTokenRequest(updateInfoRequest);
        })
}

export const getUserData = async () => {
    return await fetch(USER_INFO_URL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': '' + getCookie('accessToken')
        }})
        .then((res) => checkResponse(res))
        .catch(err => {
            refreshTokenRequest(getUserData);
        })
}

export const refreshTokenRequest = async (func?: any) => {
    return await fetch (TOKEN_URL, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': '' + getCookie('accessToken')
    },
    body: JSON.stringify( {
        'token': getCookie('refreshToken'),
    })
}).then((res) => checkResponse(res)).then(res => {
    if(res.success && res) {
        setCookie('accessToken', res.accessToken);
        setCookie('refreshToken', res.refreshToken);
        return func();
    }
    })
}

