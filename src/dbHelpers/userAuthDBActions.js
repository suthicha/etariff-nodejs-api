let connection 	= null;
let settings;
let mssql;

module.exports = (injectedMssql, injectedSettings) => {
	mssql 		= injectedMssql;
	settings 	= injectedSettings;

	return {
		LoginAction,
		SaveAccessTokenAction,
		GetAccessTokenAction,
		InsertAction,
		UpdateAction,
		SelectAction
	}
}

const initConnection = () => {
	connection = new mssql.ConnectionPool(settings.ConnectionSettings);
}

/**
 * query
 * @param {object} user_id 
 * @param {object} password 
 * @param {Func} callback 
 */
const LoginAction = (user_id, password, callback) => {
	initConnection();
	connection.connect().then(()=>{
		const req = new mssql.Request(connection);
		req.input('USER_ID', user_id)
		.input('USER_PWD', password)
		.execute('SP_USERS_AUTH', (err, results) => {
			connection.close();
			callback(createDataResponseObject(err, results.recordset))
		})
	})
}

/**
 * saveAccessToken
 * @param {object} user_id 
 * @param {object} access_token 
 * @param {Func} callback 
 */
const SaveAccessTokenAction = (user_id, access_token, callback) => {
	initConnection();
	connection.connect().then(()=> {
		const req = new mssql.Request(connection);
		req.input('USER_ID', user_id)
		.input('ACCESS_TOKEN', access_token)
		.execute('SP_OAUTH_ACCESSLOG', (err, results) => {
			connection.close();
			callback(createDataResponseObject(err, results))
		})
	})
}


/**
 * GetAccessToken
 * 
 * @param {object} accessToken 
 * @param {Func} callback 
 */
const GetAccessTokenAction = (access_token, callback) => {
	initConnection();
	connection.connect().then(()=>{
		const req = new mssql.Request(connection);
		req.input('access_token', access_token)
		.query('select token as sys_token from users where user_id = (select top 1 user_id from OAUTH_ACCESSLOG where access_token=@access_token)', (err, results) => {
			connection.close();
			callback(createDataResponseObject(err, results));
		})
	})
}


/**
 * Insert New User
 * @param {object} user 
 * @param {func} callback 
 */
const InsertAction = (user, callback) => {
	initConnection();
	connection.connect().then(()=>{
		var req = new mssql.Request(connection);
		req.input('COMPANY_CODE', user.company_code) 
		.input('DEPT_CODE', user.dept_code) 
		.input('EMAIL', user.email) 
		.input('EMPLOYEE_ID', user.employee_id) 
		.input('FIRST_NAME', user.first_name) 
		.input('GROUP_ID', user.group_id) 
		.input('LAST_NAME', user.last_name) 
		.input('PHONE', user.phone) 
		.input('USER_ID', user.user_id) 
		.input('USER_PWD', user.user_pwd) 
		.execute('SP_USERS_INSERT', (err, result) => {
			connection.close();
			callback(createDataResponseObject(err, result));
		})
	});
};


/**
 * Update User			
 * @param {object} user 
 * @param {func} callback 
 */
const UpdateAction = (user, callback) => {
	initConnection();
	connection.connect().then(()=>{
		var req = new mssql.Request(connection);
		req.input('COMPANY_CODE', user.company_code) 
		.input('DEPT_CODE', user.dept_code) 
		.input('EMAIL', user.email) 
		.input('EMPLOYEE_ID', user.employee_id) 
		.input('FIRST_NAME', user.first_name) 
		.input('GROUP_ID', user.group_id) 
		.input('LAST_NAME', user.last_name) 
		.input('PHONE', user.phone) 
		.input('USER_ID', user.user_id) 
		.input('TRXNO', user.trxno)
		.execute('SP_USERS_UPDATE', (err, result) => {
			connection.close();
			callback(createDataResponseObject(err, result));
		})
	});
};

/**
 * Select all user
 * @param {object} callback 
 */
const SelectAction = (callback) => {
	initConnection();
	connection.connect().then(()=>{
		var req = new mssql.Request(connection);
		req.execute('SP_USERS_SELECT', (err, result) => {
			connection.close();
			callback(createDataResponseObject(err, result));
		})
	});
}

const createDataResponseObject = (error, results) => {
	return {
		error,
		results: results === undefined ? null : results === null ? null : results
	}
};



