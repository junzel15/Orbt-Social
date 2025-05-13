import {Amplify} from 'aws-amplify';
import {
  COGNITO_REGION,
  COGNITO_USER_POOL_ID,
  COGNITO_APP_CLIENT_ID,
} from '@env';

Amplify.configure({
  Auth: {
    region: COGNITO_REGION,
    userPoolId: COGNITO_USER_POOL_ID,
    userPoolWebClientId: COGNITO_APP_CLIENT_ID,
    authenticationFlowType: 'USER_SRP_AUTH',
  },
});
