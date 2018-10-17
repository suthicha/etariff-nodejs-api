const execute = (req, res, next) => {
    
    try {
        if (!req.body) throw new Error('Input Error');
        
        if(!req.params.customerCode){
            customerModel.insert(req.body, (err, result) => {
                if (!err){
                    res.status(201).json({
                        statusCode: "CREATED",
                        message: "Create new customer was done."
                    });
                }else{
                    res.status(400).json({
                        errorCode: "INTERNAL_SERVER_ERROR",
                        message: err.message
                    });
                }
                
            })
        }else{
            customerModel.update(req.body, (err, result) => {
                if (!err){
                    res.status(200).json({
                        statusCode: "UPDATED",
                        message: "Update customer successfully."
                    });
                }else{
                    res.status(400).json({
                        errorCode: "INTERNAL_SERVER_ERROR",
                        message: err.message
                    })
                }
            })
        }
        
    } catch(e){
        res.status(400).json({
            error: 'invalid_request',
            error_description: 'customer invalid body request.',
            instance_url: urlHelper.getUrl(req)
        })
    }
}

const selectCustomer = (req, res, next) => {
    try{
        customerModel.select('C', null, (err, result) => {
            if (!err){
                res.status(200).json({
                    customers: result.recordset
                })
            }else{
                res.status(200).json({
                    customers: [],
                    error_description: err.message
                })
            }
        })
    }catch(e){
        res.status(400).json({
            error: 'invalid_request',
            error_description: 'customer invalid body request.',
            instance_url: urlHelper.getUrl(req)
        })
    }
}

const selectEndCustomer = (req, res, next) => {
    try{
        if(!req.params.customerCode) throw new Error('Input Error');
        customerModel.select('E', req.params.customerCode, (err, result) => {
            if (!err){
                res.status(200).json({
                    endCustomers: result.recordset
                })
            }else{
                res.status(200).json({
                    endCustomers: [],
                    error_description: err.message
                })
            }
        })
    }catch(e){
        res.status(400).json({
            error: 'invalid_request',
            error_description: 'customer invalid body request.',
            instance_url: urlHelper.getUrl(req)
        })
    }
}


let urlHelper;
let customerModel;

module.exports = (injectedUrlHelper, injectedCustomerModel) =>{
    urlHelper       = injectedUrlHelper;
    customerModel   = injectedCustomerModel;

    return {
        execute,
        selectCustomer,
        selectEndCustomer
    }

}
