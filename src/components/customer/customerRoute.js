module.exports = (router, oAuth, customerRouteMethods) => {
    router.get('/', oAuth.checkAuth, customerRouteMethods.selectCustomer);
    router.get('/:customerCode', oAuth.checkAuth, customerRouteMethods.selectEndCustomer);
    router.put('/', oAuth.checkAuth, customerRouteMethods.execute);
    router.post('/:customerCode', oAuth.checkAuth, customerRouteMethods.execute);
    return router;
};