// utils/blacklist.js

const tokenBlacklist = new Set();


function addToBlacklist(token) {
  tokenBlacklist.add(token);
}

function isBlacklisted(token) {
  return tokenBlacklist.has(token);
}

module.exports = {
  addToBlacklist,
  isBlacklisted,
};
