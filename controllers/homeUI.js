const { error, success } = require("../utils/responseWrap");

const getHomeUIController = async (req, res) => {
  try {
    // Assuming req._id is the user's ID obtained from authentication middleware
    return res.send(success(200, "These are all the Home UI Data"));
  } catch (e) {
    res.send(error(500, e.message));
  }
};

module.exports = {
  getHomeUIController,
};
