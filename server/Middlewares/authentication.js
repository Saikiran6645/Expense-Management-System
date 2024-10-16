const jwt = require("jsonwebtoken");
const userAuth = async (req, res, next) => {
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];
  //   console.log(token);
  const jwtverify = jwt.verify(token, "ramkey", (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
  //   console.log(jwtverify);
  if (jwtverify) {
    req.user = jwtverify.id;
    next();
  } else {
    const error = new Error("invalid authorization");
    next(error);
  }
};
module.exports = userAuth;
