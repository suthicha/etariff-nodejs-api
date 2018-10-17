let companyDBActions;

module.exports = injectedCompanyDBActions => {
	companyDBActions = injectedCompanyDBActions;
	return {
        Select
	}
}

const Select = (callback) => {
    companyDBActions.SelectAction((dataResponseObject) => {
        callback(dataResponseObject.error, 
            dataResponseObject.results !== null && dataResponseObject.results.recordset.length > 0
            ? dataResponseObject.results.recordset
            : null);
    })
};