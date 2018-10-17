
const select = (req, res, next) => {
    try{
        
        companyModel.Select((err, data) => {
            if (!err){
                res.status(200).json({
                    instance_url: urlHelper.getUrl(req),
                    statusCode: "SELECT",
                    company: data
                });
            }else{
                responseError(req, res, 'INTERNAL_SERVER_ERROR');        
            }
        });
    }catch(e){
        responseError(req, res, 'Found error : ' + e.message);        
    }
};


let urlHelper;
let companyModel;

module.exports = (injectedUrlHelper, injectedCompanyDBHelper) =>{
    urlHelper       = injectedUrlHelper;
    companyModel   = injectedCompanyDBHelper;

    return {
        select
    }
};