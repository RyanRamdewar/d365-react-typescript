# Dynamics 365 React App Template
Starter Template for a React Typescript App that will be used within Dynamics 365

1. Clone repo 

2. Open hs-d365-starter in VS Code

3. Run npm install

4. In Azure AD create an app registration with API access to Dynamics 365

5. Update common\ADALConfig_V2.ts with infotmation from app registration

<pre><code>
// Msal Configurations
const config: Configuration = {
    auth: {

        authority: **'https://login.microsoftonline.com/8c138b27-61c9-4e8e-ac61-57836e614c8b'**,//replace tenant guid
        clientId: **'9624975f-6db7-4791-b46c-b70894f1c75b'**, // app registration clientid
        redirectUri: 'http://localhost:3000/',
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
    }
};

const authenticationParameters = {
    scopes: [
        **'https://d665tnant.crm.dynamics.com/user_impersonation'** //replace tenant name
    ]
}
</code></pre>