const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Function to generate a JWT token
function generateToken(userId) {
  const payload = { userId: userId };
  const options = {
    expiresIn: "1h", // Set the token to expire in 1 hour (adjust as needed)
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

// Function to check validity of a JWT token
async function verifyToken(req, res, next) {
  const token = await req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decodedUser;
    next();
  });
}

module.exports = { generateToken, verifyToken };
