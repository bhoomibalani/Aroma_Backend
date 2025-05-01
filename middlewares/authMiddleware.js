const JWT = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    // Check if the Authorization header exists and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).send({
        success: false,
        message: "Authorization token missing or malformed",
      });
    }

    const token = authHeader.split(" ")[1];

    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized User",
        });
      } else {
        req.user = decode; // Prefer attaching decoded info to req.user
        console.log("decode",decode);
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Authentication Middleware",
      error: error.message,
    });
  }
};
