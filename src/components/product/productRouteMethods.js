
const insert = (req, res, next) => {
    try{   
        if (!req.body) throw new Error('Input Error');

        productModel.Insert(req.body,(err, data) => {

            if (!err){
                res.status(201).json({
                    statusCode: "CREATE",
                    trxno: data.recordset[0].TRX_NO,
                    instance_url: urlHelper.getUrl(req)
                });
            }else{
                responseError(req, res, 'INTERNAL_SERVER_ERROR');        
            }
        });
    }catch(e){
        responseError(req, res, 'Found error : ' + e.message);        
    }  
};

const update = (req, res, next) => {
    try{   
        if (!req.body & !req.params.id) throw new Error('Input Error');
        

        productModel.Update(req.body,(err, data) => {
            if (!err){
                res.status(200).json({
                    statusCode: "UPDATE",
                    product: req.body,
                    id: req.params.id,
                    instance_url: urlHelper.getUrl(req)
                });
            }else{
                responseError(req, res, 'INTERNAL_SERVER_ERROR');        
            }
        });
    }catch(e){
        responseError(req, res, 'Found error : ' + e.message);        
    }  
};

const deleted = (req, res, next) => {
    try{   
        if (!req.params.user_id & !req.params.id) throw new Error('Input Error');
        
        const { user_id, id} = req.params;
        productModel.Delete(user_id, id,(err, data) => {
            console.log(err);
            if (!err){
                res.status(200).json({
                    statusCode: "DELETE",
                    trxno: id,
                    instance_url: urlHelper.getUrl(req)
                });
            }else{
                responseError(req, res, 'INTERNAL_SERVER_ERROR');        
            }
        });
    }catch(e){
        responseError(req, res, 'Found error : ' + e.message);        
    }  
}

const find = (req, res, next) => {
    try{   
        if (!req.params.productname 
            & !req.params.taxno
            & !req.params.user_id) throw new Error('Input Error');
        
        const { user_id, taxno, productname, pageno, pagesize } = req.params;
        productModel.Find(user_id, taxno, productname, pageno, pagesize, (err, data) => {
            if (!err){
                res.status(200).json({
                    statusCode: "FILTER",
                    taxno: taxno,
                    filter: productname,
                    pageno,
                    pagesize,
                    totalrow: data && data.totalrow,
                    totalpage: data && data.totalpage,
                    products: data && data.recordset,
                    instance_url: urlHelper.getUrl(req)
                });
            }else{
                responseError(req, res, 'INTERNAL_SERVER_ERROR');        
            }
        });
    }catch(e){
        responseError(req, res, 'Found error : ' + e.message);        
    }
};

const select = (req, res, next) => {
    try{
        if (!req.params.productname 
            & !req.params.taxno) throw new Error('Input Error');
        
        const { user_id, taxno, pageno, pagesize } = req.params;
        productModel.Select(user_id, taxno, pageno, pagesize, (err, data) => {
            if (!err){
                res.status(200).json({
                    instance_url: urlHelper.getUrl(req),
                    statusCode: "SELECT",
                    taxno: taxno,
                    page: pageno,
                    pagesize: pagesize,
                    totalrow: data && data.totalrow,
                    totalpage: data && data.totalpage,
                    products: data && data.recordset
                });
            }else{
                responseError(req, res, 'INTERNAL_SERVER_ERROR');        
            }
        });
    }catch(e){
        responseError(req, res, 'Found error : ' + e.message);        
    }
}

const responseError = (req, res, message) => {
    res.status(400).json({
        error: 'invalid_request',
        error_description: message,
        instance_url: urlHelper.getUrl(req)
    })
};


let urlHelper;
let productModel;

module.exports = (injectedUrlHelper, injectedProductDBHelper) =>{
    urlHelper       = injectedUrlHelper;
    productModel   = injectedProductDBHelper;

    return {
        insert,
        deleted,
        update,
        find,
        select
    }

}