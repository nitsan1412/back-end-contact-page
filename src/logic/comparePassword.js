const bcrypt = require("bcryptjs");

// Function to check a hash password
async function comparePassword(candidatePassword, hash) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, hash);
    return isMatch;
  } catch (err) {
    console.error("Error in compare:", err);
    throw err;
  }
}

module.exports = { comparePassword };
