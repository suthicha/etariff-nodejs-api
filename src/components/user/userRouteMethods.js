
const insert = (req, res, next) => {
    try{
        if (!req.body) throw new Error('Input Error');

        userModel.insert(req.body, (err, data) => {
            if (!err){
                res.status(201).json({
                    statusCode: "INSERT",
                    message: "Insert user successfully.",
                    instance_url: urlHelper.getUrl(req)
                });
            }else{
                res.status(400).json({
                    errorCode: "INTERNAL_SERVER_ERROR",
                    message: err.message,
                    instance_url: urlHelper.getUrl(req)
                });
            }
        });

    }catch(e){
        res.status(400).json({
            error: 'invalid_request',
            error_description: 'insert user invalid body request.',
            instance_url: urlHelper.getUrl(req)
        })
    }
};

const update = (req, res, next) => {
    try{
        if (!req.body || !req.params.id) throw new Error('Input Error');

        userModel.update(req.body, (err, data) => {
            if (!err){
                res.status(200).json({
                    statusCode: "UPDATE",
                    message: "Update user id "+ req.params.id +" successfully.",
                    instance_url: urlHelper.getUrl(req)
                });
            }else{
                res.status(400).json({
                    errorCode: "INTERNAL_SERVER_ERROR",
                    message: err.message,
                    instance_url: urlHelper.getUrl(req)
                });
            }
        });

    }catch(e){
        res.status(400).json({
            error: 'invalid_request',
            error_description: 'update user invalid body request.',
            instance_url: urlHelper.getUrl(req)
        })
    }
};

const select = (req, res, next) => {
    try{
        userModel.select((err, data) => {
            if (!err){
                res.status(200).json({
                    statusCode: "SELECT",
                    users: data,
                    instance_url: urlHelper.getUrl(req)
                });
            }else{
                res.status(400).json({
                    errorCode: "INTERNAL_SERVER_ERROR",
                    message: err.message,
                    instance_url: urlHelper.getUrl(req)
                });
            }
        });
    }catch(e){
        res.status(400).json({
            error: 'invalid_request',
            error_description: 'select method found error',
            instance_url: urlHelper.getUrl(req)
        })
    }
};

let urlHelper;
let userModel;

module.exports = (injectedUrlHelper, injectedUserModel) =>{
    urlHelper       = injectedUrlHelper;
    userModel       = injectedUserModel;

    return {
        insert,
        update,
        select
    }
}