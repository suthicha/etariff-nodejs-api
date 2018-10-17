let connection = null;
let mssql;
let settings;
let async;

module.exports = (injectedMssql, injectedSettings, injectedAsync) => {
    mssql    = injectedMssql;
    settings = injectedSettings;
    async    = injectedAsync;

    return {
        SelectAction
    }
}

const initConnection = () => {
    connection = new mssql.ConnectionPool(settings.ConnectionSettings);
}


const SelectAction = (callback) => {
    initConnection();
    connection.connect().then(()=> {
        var req = new mssql.Request(connection);
        req.execute('SP_COMPANY_SELECT', (err, result) => {
            connection.close();
            callback(createDataResponseObject(err, result));
        })
    });
};


const createDataResponseObject = (error, results) => {
	return {
		error,
		results: results === undefined ? null : results === null ? null : results
	}
};