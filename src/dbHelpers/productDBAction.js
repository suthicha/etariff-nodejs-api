let connection = null;
let mssql;
let settings;
let async;

module.exports = (injectedMssql, injectedSettings, injectedAsync) => {
    mssql    = injectedMssql;
    settings = injectedSettings;
    async    = injectedAsync;

    return {
        InsertAction,
        UpdateAction,
        SelectAction,
        FilterAction,
        DeleteAction
    }
}

const initConnection = () => {
    connection = new mssql.ConnectionPool(settings.ConnectionSettings);
}

const SelectAction = (user_id, taxno, pageno, pagesize, callback) => {
    initConnection();
    connection.connect().then(()=> {
        var req = new mssql.Request(connection);
        req.input('USER_ID', user_id)
        .input('TAX_NO', taxno)
        .input('PAGENO', pageno)
        .input('PAGESIZE', pagesize)
        .output('TOTALPAGE')
        .output('TOTALROW')
        .execute('SP_PRODUCT_TARIFF_SELECT', (err, result) => {
            connection.close();
            callback(createDataResponseObject(err, result));
        })
    });
};

const FilterAction = (user_id, taxno, productname, pageno, pagesize, callback) => {
    initConnection();
    connection.connect().then(()=> {
        var req = new mssql.Request(connection);
        req.input('USER_ID', user_id)
        .input('TAX_NO', taxno)
        .input('FILTER', productname)
        .input('PAGENO', pageno)
        .input('PAGESIZE', pagesize)
        .output('TOTALPAGE')
        .output('TOTALROW')
        .execute('SP_PRODUCT_TARIFF_FILTER', (err, result) => {
            connection.close();
            callback(createDataResponseObject(err, result));
        })
    });
};


const InsertAction = (product, callback) => {
    initConnection();
    
    connection.connect().then(()=>{
        var req = new mssql.Request(connection);
        req.input('BRANCH_NO', product.branch_no) 
        .input('COMPANY_CODE', product.company_code) 
        .input('CREATE_BY', product.create_by) 
        .input('CUSTOMS_FUNC', product.customs_func) 
        .input('DIVISION_CODE', product.division_code) 
        .input('DUTY_RATE', product.duty_rate) 
        .input('FACTORY_CODE', product.factory_code) 
        .input('FILTER1', product.filter1) 
        .input('FILTER2', product.filter2) 
        .input('FILTER3', product.filter3) 
        .input('FILTER4', product.filter4) 
        .input('FILTER5', product.filter5) 
        .input('FILTER6', product.filter6) 
        .input('FORMALITY', product.formality) 
        .input('MADE_BY', product.made_by) 
        .input('MINISTRY', product.ministry) 
        .input('NEED_LICENSE', product.need_license) 
        .input('OPR_CODE', product.opr_code) 
        .input('PART_DESC', product.part_desc) 
        .input('PART_DESC_REMARK', product.part_desc_remark) 
        .input('PART_DESC_TH', product.part_desc_th) 
        .input('PART_NO', product.part_no) 
        .input('PART_SPEC', product.part_spec) 
        .input('PLANNING_REMARK', product.planning_remark) 
        .input('PRG_CODE', product.prg_code) 
        .input('PRODUCT_CLASS', product.product_class) 
        .input('PRODUCT_TYPE', product.product_type) 
        .input('REMARK', product.remark) 
        .input('REMARK1', product.remark1) 
        .input('REMARK2', product.remark2) 
        .input('SECTION', product.section) 
        .input('STAT_CODE', product.stat_code) 
        .input('TARIFF_CODE', product.tariff_code) 
        .input('TARIFF_UNIT', product.tariff_unit) 
        .input('TAX_NO', product.tax_no) 
        .input('UNIT', product.unit) 
        .input('USED_FOR_MACHINE', product.used_for_machine) 
        .execute('SP_PRODUCT_TARIFF_INSERT', (err, result) => {
            connection.close();
            callback(createDataResponseObject(err, result));
        })
    });
};



const UpdateAction = (product, callback) => {
    initConnection();
    connection.connect().then(()=>{
        var req = new mssql.Request(connection);
        req.input('BRANCH_NO', product.branch_no) 
        .input('COMPANY_CODE', product.company_code) 
        .input('CUSTOMS_FUNC', product.customs_func) 
        .input('DIVISION_CODE', product.division_code) 
        .input('DUTY_RATE', product.duty_rate) 
        .input('FACTORY_CODE', product.factory_code) 
        .input('FILTER1', product.filter1) 
        .input('FILTER2', product.filter2) 
        .input('FILTER3', product.filter3) 
        .input('FILTER4', product.filter4) 
        .input('FILTER5', product.filter5) 
        .input('FILTER6', product.filter6) 
        .input('FORMALITY', product.formality) 
        .input('MADE_BY', product.made_by) 
        .input('MINISTRY', product.ministry) 
        .input('NEED_LICENSE', product.need_license) 
        .input('OPR_CODE', product.opr_code) 
        .input('PART_DESC', product.part_desc) 
        .input('PART_DESC_REMARK', product.part_desc_remark) 
        .input('PART_DESC_TH', product.part_desc_th) 
        .input('PART_NO', product.part_no) 
        .input('PART_SPEC', product.part_spec) 
        .input('PLANNING_REMARK', product.planning_remark) 
        .input('PRG_CODE', product.prg_code) 
        .input('PRODUCT_CLASS', product.product_class) 
        .input('PRODUCT_STATUS', product.product_status) 
        .input('PRODUCT_TYPE', product.product_type) 
        .input('REMARK', product.remark) 
        .input('REMARK1', product.remark1) 
        .input('REMARK2', product.remark2) 
        .input('SECTION', product.section) 
        .input('STAT_CODE', product.stat_code) 
        .input('TARIFF_CODE', product.tariff_code) 
        .input('TARIFF_UNIT', product.tariff_unit) 
        .input('TAX_NO', product.tax_no) 
        .input('TRXNO', product.trxno)
        .input('UNIT', product.unit) 
        .input('USED_FOR_MACHINE', product.used_for_machine) 
        .input('UPDATE_BY', product.update_by)
        .execute('SP_PRODUCT_TARIFF_UPDATE', (err, result) => {
            connection.close();
            callback(createDataResponseObject(err, result));
        })
    });
};

const DeleteAction = (user_id, id, callback) => {
    initConnection();
    connection.connect().then(()=> {
        var req = new mssql.Request(connection);
        req.input('TRXNO', id)
        .input('USER_ID', user_id)
        .execute('SP_PRODUCT_TARIFF_DELETE', (err, result) => {
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
