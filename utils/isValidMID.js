const ObjectId = require("mongoose").Types.ObjectId;

const isValidMID = (string) => {
    try {
        return string == new ObjectId(`${string}`);
    } catch (error) {
        return false;
    }
};

module.exports = isValidMID;