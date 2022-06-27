const fs = require("fs");

module.exports = {
    getLayout(req, res) {
        return html = fs.readFileSync("./views/layouts/main.html", "utf-8");
    }
};