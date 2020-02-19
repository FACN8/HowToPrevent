const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.cookies.user_access) {
        jwt.verify(req.cookies.user_access, process.env.JWT_SECRET, function(
            err,
            decoded
        ) {
            if (err) {
                res.local.error = err;
                return next();
            }
            res.locals.id = decoded.userData.id;
            res.locals.name = decoded.userData.name;
            res.locals.coins = decoded.profileData.coin
            res.locals.level_attack = decoded.profileData.level_attack
            res.locals.level_auto = decoded.profileData.level_auto
            next()

        });
    } else {
        res.locals.name = false;
        res.locals.id = null;

        next();
    }
};