
let userAuthDBHelper;
let jwt;

module.exports = (injectedJWT, injectedUserAuthDBHelper) => {
		userAuthDBHelper 	= injectedUserAuthDBHelper;
		jwt					= injectedJWT;

		return {
				Sign,
				CheckAuth,
				GetUserCrential,
				GetClient
		}
};

const Sign = (client, callback) => {
	if (client !== null && client !== undefined){
		const { user_id, client_secert, client_token, instance_url } = client;
		const access_timeout = 3600 * 1000 * 60;
		const issued_at = Date.now();
		const expires_in = issued_at + access_timeout;

		const access_token = jwt.sign({
			user_id,
			client_secert,
			issued_at,
			expires_in
		}, client_token, { expiresIn: access_timeout });
		
		delete client.instance_url;
		delete client.salt;
		delete client.client_token;

		userAuthDBHelper.SaveAccessToken(user_id, access_token, error =>{
			if(!error){
				callback(true, {
					access_token,
					issued_at,
					expires_in,
					instance_url,
					user: client
				});
			}
		})
		
	}else {
		callback(false, null);
	}
}

const handleAfterSignComplete = (user_id, access_token) => {
	userAuthDBHelper.SaveAccessToken(user_id, access_token, cb =>{
		return cb;
	})
}

const CheckAuth = (access_token, callback) => {
		
		userAuthDBHelper.GetAccessToken(access_token, (err, results) => {
			
			if (results.recordset.length > 0){
				try{
					const { sys_token } = results.recordset[0];
					const decode = jwt.verify(access_token, sys_token);
					
					callback(true, decode);
				}catch(e){
					callback(false, e.message);
				}
			}else{
				callback(false, null);
			}
		})
}

const GetUserCrential = (user_id, password, callback) => {
		userAuthDBHelper.GetUserFromCrentials(user_id, password, callback);
};

const GetClient = (data) => {
	return {
		user_id: data.USER_ID,
		salt: data.SALT,
		employee_id: data.EMPLOYEE_ID,
		first_name: data.FIRST_NAME,
		last_name: data.LAST_NAME,
		company_code: data.COMPANY_CODE,
		dept_code: data.DEPT_CODE,
		email: data.EMAIL,
		phone: data.PHONE,
		group_id: data.GROUP_ID,
		trxno: data.TRXNO,
		client_secert: data.SALT,
		client_token: data.TOKEN
	}
}

// const SaveAccessToken = (accessToken, username, callback) => {
// 		userAuthDBHelper.SaveAccessToken()
// };



