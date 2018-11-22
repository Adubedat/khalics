const awsExports = {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'eu-west-1:ee3cde2b-e434-4be8-9f9b-756098823f3a',
    // REQUIRED - Amazon Cognito Region
    region: 'eu-west-1',
    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: 'eu-west-1',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'eu-west-1_jrpxZzyiw',
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '2h58edhdok2kc8ujlankvev9cj',
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,
    // OPTIONAL - Configuration for cookie storage
    // cookieStorage: {
    // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    // domain: '.yourdomain.com',
    // OPTIONAL - Cookie path
    // path: '/',
    // OPTIONAL - Cookie expiration in days
    // expires: 365,
    // OPTIONAL - Cookie secure flag
    // secure: true,
    // },
    // OPTIONAL - customized storage object
    // storage: new MyStorage(),
    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
};

export default awsExports;
