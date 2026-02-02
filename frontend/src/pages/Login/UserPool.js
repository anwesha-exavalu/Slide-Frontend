import { CognitoUserPool } from "amazon-cognito-identity-js";
const userPoolId = process.env.REACT_APP_UserPoolId;
const clientId = process.env.REACT_APP_ClientId;

const poolData = {
    UserPoolId: userPoolId,
    ClientId: clientId
}

export default new CognitoUserPool(poolData);