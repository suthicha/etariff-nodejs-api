module.exports = (router, oAuth, userRouteMethods) => {
    router.get('/', oAuth.checkAuth, userRouteMethods.select);
    router.put('/', oAuth.checkAuth, userRouteMethods.insert);
    router.post('/:id', oAuth.checkAuth, userRouteMethods.update);
    return router;
};