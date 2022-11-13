const BASE_API_URL = 'https://norma.nomoreparties.space/api';
const INGREDIENTS_URL = `${BASE_API_URL}/ingredients`;
const ORDER_URL = `${BASE_API_URL}/orders`;
const RESTORE_PASSWORD_URL = `${BASE_API_URL}/password-reset`;
const PASSWORD_RESET_URL = `${RESTORE_PASSWORD_URL}/reset`;
const AUTHORIZATION_URL = `${BASE_API_URL}/auth/login`;
const REGISTRATION_URL = `${BASE_API_URL}/auth/register`;
const LOGOUT_URL = `${BASE_API_URL}/auth/logout`;
const TOKEN_URL = `${BASE_API_URL}/auth/token`;
const USER_INFO_URL = `${BASE_API_URL}/auth/user`



export {BASE_API_URL,USER_INFO_URL, INGREDIENTS_URL, ORDER_URL, PASSWORD_RESET_URL, RESTORE_PASSWORD_URL, AUTHORIZATION_URL,REGISTRATION_URL, LOGOUT_URL, TOKEN_URL}