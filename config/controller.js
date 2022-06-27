const fs = require("fs");
const Database = require("./db");
const mysql = require("mysql");
const util = require("util");
const connectionDB = new Database();
const connection = connectionDB.connect();
const query = util.promisify(connection.query).bind(connection);
const qs = require("qs");
const url = require("url");
const path = require("path");
const getLayout = require("./getLayout")

module.exports = {
    fs, Database, mysql, util, connectionDB,
    connection, query, qs, url, path, getLayout
}