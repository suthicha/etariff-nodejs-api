let userAuthDBActions;

module.exports = injectedUserAuthDBActions => {
	userAuthDBActions = injectedUserAuthDBActions;
	return {
		   	GetUserFromCrentials,
			SaveAccessToken,
			GetAccessToken,
			Insert,
			Update,
			Select
	}
}

/**
 * GetUserFromCrentials
 * 
 * @param {object} client_id
 * @param {object} client_secert
 * @param {object} username 
 * @param {object} password 
 * @param {Func} callback 
 */
const GetUserFromCrentials = (user_id, password, callback) => {
	userAuthDBActions.LoginAction(user_id, password, (dataResponseObject)=> {
		callback(dataResponseObject.error, 
			dataResponseObject.results !== null && dataResponseObject.results.length === 1 
			? dataResponseObject.results[0]
			: null
		)
	})	
};

/**
 * SaveAccessToken
 * @param {object} user_id 
 * @param {object} access_token 
 * @param {Func} callback 
 */
const SaveAccessToken = (user_id, access_token, callback) => {
	userAuthDBActions.SaveAccessTokenAction(user_id, access_token, (dataResponseObject)=>{
		callback(dataResponseObject.error);
	})
};

/**
 * GetAccessToken
 * @param {object} access_token 
 * @param {func} callback 
 */
const GetAccessToken = (access_token, callback) => {
	userAuthDBActions.GetAccessTokenAction(access_token, dataResponseObject=>{
		callback(dataResponseObject.error, 
			dataResponseObject.results
		)
	});
}

/**
 * Insert user
 * @param {object} user 
 * @param {func} callback 
 */
const Insert = (user, callback) => {
	userAuthDBActions.InsertAction(user, (dataResponseObject)=> {
		callback(dataResponseObject.error, 
			dataResponseObject.results
			)
	})
};


/**
 * Update user
 * @param {object} user 
 * @param {func} callback 
 */
const Update = (user, callback) => {
	userAuthDBActions.UpdateAction(user, (dataResponseObject)=> {
		callback(dataResponseObject.error, 
			dataResponseObject.results
			)
	})
};


/**
 * Select all user
 * @param {func} callback 
 */
const Select = (callback) => {
	
	userAuthDBActions.SelectAction(dataResponseObject => {
		callback(dataResponseObject.error,
			dataResponseObject.results)
	})
};
