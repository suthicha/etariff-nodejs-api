const express 			= require('express');
const expressApp 		= express();

const cors 				= require('cors');
const async				= require('async');
const mssql				= require('mssql');
const jwt				= require('jsonwebtoken');
const morgan 			= require('morgan');
const url				= require('url');
const bodyParser 		= require('body-parser');
const settings			= require('./settings');
const urlHelper			= require('./utils/urlHelper')(url);
const userAuthDBActions	= require('./dbHelpers/userAuthDBActions')(mssql, settings);
const userAuthDBHelper	= require('./dbHelpers/userAuthDBHelper')(userAuthDBActions);
const oAuthTokenModel 	= require('./oauth2/accessTokenModel')(jwt, userAuthDBHelper);

const authRoutesMethods	= require('./oauth2/authRoutesMethods')(oAuthTokenModel, urlHelper);
const authRoutes		= require('./oauth2/authRoutes')(express.Router(), authRoutesMethods);

const userDBActions	= require('./dbHelpers/userDBAction')(mssql, settings,async);
const userDBHelper	= require('./dbHelpers/userDBHelper')(userDBActions);
const userModel		= require('./components/user/userModel')(userDBHelper);
const userRouteMethods 	= require('./components/user/userRouteMethods')(urlHelper, userModel);
const userRoutes 	= require('./components/user/userRoute')(express.Router(), authRoutesMethods, userRouteMethods);

const productDBAction	= require('./dbHelpers/productDBAction')(mssql, settings,async);
const productDBHelper	= require('./components/product/productDBHelper')(productDBAction);
const productRouteMethods = require('./components/product/productRouteMethods')(urlHelper, productDBHelper);
const productRoutes 	= require('./components/product/productRoute')(express.Router(), authRoutesMethods, productRouteMethods);

const companyDBAction	= require('./dbHelpers/companyDBActions')(mssql, settings,async);
const companyDBHelper	= require('./components/company/companyDBHelper')(companyDBAction);
const companyRouteMethods = require('./components/company/companyRouteMethods')(urlHelper, companyDBHelper);
const companyRoutes 	= require('./components/company/companyRoute')(express.Router(), authRoutesMethods, companyRouteMethods);


expressApp.use(morgan('dev'));
expressApp.use(cors());
expressApp.use(bodyParser.urlencoded({extended: false}));
expressApp.use(bodyParser.json());

// expressApp.use((req, res, next) => {
// 		res.header('Access-Control-Allow-Origin', '*');
// 		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
// 		if(res.method === 'OPTIONS'){
// 				res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
// 				return res.status(200).json({});
// 		}
// 		next();
// });

expressApp.use('/services/oauth2', authRoutes);
expressApp.use(`${settings.ROUTE_PATH}/user`, userRoutes);
expressApp.use(`${settings.ROUTE_PATH}/product`, productRoutes);
expressApp.use(`${settings.ROUTE_PATH}/company`, companyRoutes);

expressApp.use((req, res, next) => {
		const error = new Error('Not Found');
		error.status = 400;
		next(error);
});

expressApp.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.json({
				error: "INVARID_ROUTE",
				error_description: "Find not found routing"
		});
});

module.exports = expressApp;
