let customerHelper;

module.exports = injectedCustomerHelper => {
    customerHelper = injectedCustomerHelper;
    return{
        insert: customerHelper.insert,
        update: customerHelper.update,
        select: customerHelper.select
    }
}
