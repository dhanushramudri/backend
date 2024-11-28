const app = require("../index"); // Import your Express app
module.exports = (req, res) => {
  app(req, res); // Pass the request and response to Express
};
