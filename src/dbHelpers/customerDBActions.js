let connection = null;
let mssql;
let settings;
let async;

module.exports = (injectedMssql, injectedSettings, injectedAsync) => {
    mssql    = injectedMssql;
    settings = injectedSettings;
    async    = injectedAsync;

    return {
        execute,
        select
    }
}

const initConnection = () => {
    connection = new mssql.ConnectionPool(settings.ConnectionSettings);
}

const select = (customerType, customerCode, callback) => {
    initConnection();
    connection.connect().then(()=> {
        var req = new mssql.Request(connection);
        if (customerType === 'C'){
            req.execute('SP_CTI_API_SEL_CUSTOMER', (err, result) => {
                connection.close();
                callback(err, result);
            })
        }else{
            req.input('CustomerCode', customerCode)
            .execute('SP_CTI_API_SEL_ENDCUSTOMER', (err, result) => {
                connection.close();
                callback(err, result);
            })
        }
    });
}

const execute = (customerObj, callback) => {
    initConnection();
   
    async.waterfall([
        function(cb){
            connection.connect().then(() => {
                const req = new mssql.Request(connection);
                req.input('CustomerType', customerObj.CustomerType)
                .input('CustomerCode', customerObj.CustomerCode)
                .input('RefCustomerCode', customerObj.RefCustomerCode)
                .input('CustomerName', customerObj.CustomerName)
                .input('CreditTerm', customerObj.CreditTerm)
                .input('CustomerService1', customerObj.CustomerService1)
                .input('CurrencyCode', customerObj.CurrencyCode)
                .input('BranchNo', customerObj.BranchNo)
                .input('BranchName', customerObj.BranchName)
                .input('TaxId', customerObj.TaxId)
                .input('Address1', customerObj.Address1)
                .input('Address2', customerObj.Address2)
                .input('Address3', customerObj.Address3)
                .input('Address4', customerObj.Address4)
                .input('Email', customerObj.Email)
                .input('Mobile', customerObj.Mobile)
                .input('Telephone', customerObj.Telephone)
                .input('ExtensionNo', customerObj.ExtensionNo)
                .execute('SP_CTI_API_EXECUTE_CUSTOMER', (err, result) => {
                    connection.close();
                    cb(err, result);
                })
            })
        }
    ], function(err, result){
        // result now equal 'done'
        callback(err, result);
    });
}
