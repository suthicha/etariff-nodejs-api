let userDBActions;

module.exports = injectedUserDBActions => {
	userDBActions = injectedUserDBActions;
	return {
			Insert,
			Update,
			Select
	}
}



/**
 * Insert user
 * @param {object} user 
 * @param {func} callback 
 */
const Insert = (user, callback) => {
	userDBActions.InsertAction(user, (dataResponseObject)=> {
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
	userDBActions.UpdateAction(user, (dataResponseObject)=> {
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
	
	userDBActions.SelectAction(dataResponseObject => {
		callback(dataResponseObject.error,
			dataResponseObject.results != null
			? dataResponseObject.results.recordset
			: null
		 )
	})
};