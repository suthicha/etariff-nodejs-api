module.exports = (router, oAuth, companyRouteMethods) => {
    router.get('/', companyRouteMethods.select);
    return router;
};