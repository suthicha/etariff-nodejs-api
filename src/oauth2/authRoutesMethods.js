let oAuthTokenModel;
let urlHelper;

module.exports = (injectedOAuthTokenModel, injectedUrlHelper) => {
    oAuthTokenModel = injectedOAuthTokenModel;
    urlHelper       = injectedUrlHelper;
    return {
        login,
        checkAuth
    }
}

const loginResponse = (res, client) => {
    oAuthTokenModel.Sign(client,(status, clientAccessToken)=>{
        sendResponse(res, {
            ...clientAccessToken    
        }, 200)
    })
}

const loginErrorResponse = (res) => {
    sendResponse(res, {
        error: "invalid_login",
        error_description: "invalid verify credentials"
    },401);
}

const login = (req, res) => {
    const { user_id, password } = req.body;
    
    oAuthTokenModel.GetUserCrential(user_id, password, (err, data) => {
        
        if(data){
            let client = oAuthTokenModel.GetClient(data);
            client.instance_url = urlHelper.getUrl(req);
            loginResponse(res, client);
        }else{
            loginErrorResponse(res);
        }
    })
}

const checkAuth = (req, res, next) => {
    const token = req.param('token');
    if (token){
        oAuthTokenModel.CheckAuth(token, (status, decode)=>{
            
            if (status){
                res.userData = decode;
                next();
            }else{
                res
                .status(401)
                .json({
                    error: "invalid_token",
                    error_description: "invalid or expired token"
                })
            }
        })
    }else{
        res
        .status(404)
        .json({
            error: "invalid_token",
            error_description: "token was not found"
        })
    }
}

const sendResponse = (res, message, status) => {
    res.status(status)
    .json({
        ...message
    })
}