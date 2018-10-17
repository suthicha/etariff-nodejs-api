let productDBActions;

module.exports = injectedProductDBActions => {
	productDBActions = injectedProductDBActions;
	return {
        Insert,
        Update,
        Delete,
        Select,
        Find
	}
}
/**
 * Insert Product   
 * @param {object} product 
 * @param {func} callback 
 */
const Insert = (product, callback) => {
    productDBActions.InsertAction(product, (dataResponseObject) => {
        callback(dataResponseObject.error, dataResponseObject.results);
    });
};


/**
 * Update Product   
 * @param {object} product 
 * @param {func} callback 
 */
const Update = (product, callback) => {
    
    productDBActions.UpdateAction(product, (dataResponseObject) => {
        callback(dataResponseObject.error, dataResponseObject.results);
    })
};


/**
 * Delete product
 * @param {object} id 
 * @param {object} user_id
 * @param {func} callback 
 */
const Delete = (user_id, id, callback) => {
    productDBActions.DeleteAction(user_id, id, (dataResponseObject) => {
        callback(dataResponseObject.error, dataResponseObject.results);
    })
};


/**
 * Query Product By User Permission.    
 * @param {object} user_id 
 * @param {object} taxno 
 * @param {func} callback 
 */
const Select = (user_id, taxno, pageno, pagesize, callback) => {
    productDBActions.SelectAction(user_id, taxno, pageno, pagesize, (dataResponseObject) => {
       
        callback(dataResponseObject.error, 
            dataResponseObject.results !== null && dataResponseObject.results.recordset.length > 0
            ? {recordset: dataResponseObject.results.recordset, 
                totalpage: dataResponseObject.results.output.TOTALPAGE,
                totalrow: dataResponseObject.results.output.TOTALROW  }
            : null);
    })
};


/**
 * Filter customer product.
 * @param {object} user_id 
 * @param {object} taxno 
 * @param {object} productname 
 * @param {func} callback 
 */
const Find = (user_id, taxno, productname, pageno, pagesize, callback) => {
    productDBActions.FilterAction(user_id, taxno, productname, pageno, pagesize, (dataResponseObject) => {
        callback(dataResponseObject.error, 
            dataResponseObject.results !== null && dataResponseObject.results.recordset.length > 0
            ? {recordset: dataResponseObject.results.recordset, 
                totalpage: dataResponseObject.results.output.TOTALPAGE,
                totalrow: dataResponseObject.results.output.TOTALROW  }
            : null);
    })
};

