import { Configuration } from 'msal';
import { LoginType, MsalAuthProvider } from 'react-aad-msal';

// Msal Configurations
const config: Configuration = {
    auth: {

        authority: 'https://login.microsoftonline.com/8c138b27-61c9-4e8e-ac61-57836e614c8b',//replace tenant guid
        clientId: '9624975f-6db7-4791-b46c-b70894f1c75b', // app registration clientid
        redirectUri: 'http://localhost:3000/',
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
    }
};

const authenticationParameters = {
    scopes: [
        'https://d665tnant.crm.dynamics.com/user_impersonation' //replace tenant name
    ]
}

// Options
const options = {
    loginType: LoginType.Redirect,
    tokenRefreshUri: window.location.origin
}

export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)
