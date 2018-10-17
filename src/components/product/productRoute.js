module.exports = (router, oAuth, productRouteMethods) => {
    router.get('/:user_id/:taxno/:pageno/:pagesize', productRouteMethods.select);
    router.get('/filter/:user_id/:taxno/:productname/:pageno/:pagesize', productRouteMethods.find);
    router.put('/', productRouteMethods.insert);
    router.post('/:id', productRouteMethods.update);
    router.delete('/:id/:user_id', productRouteMethods.deleted);
    return router;
};