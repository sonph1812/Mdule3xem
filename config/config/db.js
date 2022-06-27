const mysql = require("mysql");
const util = require("util");

class Database {
    constructor() {
    }

    connect() {
        return mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "mysql123456",
            database: "local_guide",
            charset: "utf8_general_ci"
        });

    }

}

module.exports = Database;



