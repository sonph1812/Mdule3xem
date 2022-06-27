const cityController = require("../controllers/CityController");

module.exports = {
    "": cityController.index,
    "notfound": cityController.notfound,
    "city/detail" : cityController.detail,
    "city/delete" : cityController.delete,
    "city/create" : cityController.create,
    "city/update" : cityController.update,
};

