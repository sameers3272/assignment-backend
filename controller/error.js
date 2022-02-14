exports.get404 = (req, res, next) => {
    res.json({error:"404"});
}
