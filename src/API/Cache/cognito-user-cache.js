import { Auth } from 'aws-amplify';

const getJwtToken = async () => {
    if (localStorage.getItem('jwtToken') === null ||
        new Date().getTime() - localStorage.getItem('lastJwtTokenStoredTime') > 1000*60*30)  {
            try {
                const currentSession = await Auth.currentSession();
                const jwtToken = currentSession.getIdToken().getJwtToken();
                localStorage.setItem('jwtToken', jwtToken);
                localStorage.setItem('lastJwtTokenStoredTime', new Date().getTime());
            } catch (error) {
                console.log(error);
                if (error.code === 'NotAuthorizedException' || error === 'No current user') {
                    Auth.signOut();
                } else {
                    throw error;
                }
            }
    }
    return localStorage.getItem('jwtToken');
}

const getUserName = async () => {
    if (localStorage.getItem('username') === null) {
        try {
            const currentUserInfo = await Auth.currentUserInfo();
            const username = currentUserInfo.username;
            localStorage.setItem('username', username);
        } catch (error) {
            console.log(error);
            if (error.code === 'NotAuthorizedException' || error === 'No current user') {
                Auth.signOut();
            } else {
                throw error;
            }
        }
    }
    return localStorage.getItem('username')
}

export {
    getJwtToken,
    getUserName
};