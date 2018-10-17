let userHelper;

module.exports = injectedUserHelper => {
    userHelper = injectedUserHelper;
    return{
        insert: userHelper.Insert,
        update: userHelper.Update,
        select: userHelper.Select
    }
}