let connection 	= null;
let settings;
let mssql;

module.exports = (injectedMssql, injectedSettings) => {
	mssql 		= injectedMssql;
	settings 	= injectedSettings;

	return {
		InsertAction,
		UpdateAction,
		SelectAction
	}
}

const initConnection = () => {
	connection = new mssql.ConnectionPool(settings.ConnectionSettings);
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