let customerDBActions;

module.exports = injectedCustomerDBActions => {
    customerDBActions = injectedCustomerDBActions;
    return {
        insert,
        update,
        select
    }
}
/**
 * Insert new customer.
 * @param {object} customerObj 
 * @param {object} callback 
 */
const insert = (customerObj, callback) => {
    
    customerDBActions.execute(customerObj, (err, result) => {
        callback(err, result);
    })
}


/**
 * Update a customer.
 * @param {object} customerObj 
 * @param {object} callback 
 */
const update = (customerObj, callback) => {
    customerDBActions.execute(customerObj, (err, result) => {
        callback(err, result);
    })
}

/**
 * Select customer or endcustomer.
 * @param {object} customerType 
 * @param {object} customerCode 
 * @param {object} callback 
 */
const select = (customerType, customerCode, callback) => {
    customerDBActions.select(customerType, customerCode, (err, result) => {
        callback(err, result);
    })
}
