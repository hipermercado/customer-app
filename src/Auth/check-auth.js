import { Auth } from 'aws-amplify';

const saveLoginInLocalStorage = () => {
    localStorage.setItem('loginTime', new Date().getTime());
}

const removeLoginInFromLocalStorage = () => {
    localStorage.removeItem('loginTime');
}

const isUserLoggedIn = () => {
    const lastLoginTime = localStorage.getItem('loginTime');
    if (lastLoginTime === null) {
        return false;
    }
    if (new Date().getTime() - lastLoginTime < 1000*60*60*24*365) {
        return true;
    } else {
        Auth.signOut();
    }
}

export { saveLoginInLocalStorage, removeLoginInFromLocalStorage };
export default isUserLoggedIn;