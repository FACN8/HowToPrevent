const jwt = require("jsonwebtoken");

module.exports = authCheck = (req, res, next) => {
  jwt.verify(req.cookies.data, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      res.locals.error = err;
    }

    (res.locals.signedIn = decoded.access_token),
      (res.locals.user = decoded.userName),
      (res.locals.id = decoded.id);

    next();
  });
};
