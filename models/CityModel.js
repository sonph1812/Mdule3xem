const {mysql, query} = require("../config/controller");

class CityModel {
    constructor() {

    }

    async getCities() {
        try {
            let selectCitiesSql = `SELECT * FROM local_guide.??`
            selectCitiesSql = mysql.format(selectCitiesSql, ["cities"])
            let cities = await query(selectCitiesSql);
            // console.log(selectCitiesSql)
            // console.log(cities)
            return JSON.parse(JSON.stringify(cities))

        } catch (err) {
            console.log(err.message)
        }

    }

    async getCountry() {
        try {
            let selectCitiesSql = `SELECT * FROM local_guide.??`
            selectCitiesSql = mysql.format(selectCitiesSql, ["country"])
            let country = await query(selectCitiesSql);
            // console.log(selectCitiesSql)
            // console.log(cities)
            return JSON.parse(JSON.stringify(country))

        } catch (err) {
            console.log(err.message)
        }
    }

    async getCountryById(id) {
        try {
            let selectCitiesSql = `SELECT * FROM local_guide.?? WHERE ?? =?`
            selectCitiesSql = mysql.format(selectCitiesSql, ["country", "Id", id])
            let country = await query(selectCitiesSql);
            // console.log(selectCitiesSql)
            // console.log(cities)
            return JSON.parse(JSON.stringify(country))

        } catch (err) {
            console.log(err.message)
        }
    }

    async createCity(city) {
        // INSERT INTO `local_guide`.`cities` ( `name`, `countryId`, `area`, `popular`, `GDP`, `desciption`) VALUES ('', 'Huế', '1', '2000', '2000', '2000', 'Thành phố cố đô');
        let createCitySql = `INSERT INTO local_guide.??(??, ??, ??, ??, ??, ?? ) VALUES (?, ?, ?, ?, ?, ?) `
        createCitySql = mysql.format(createCitySql, ["cities", `name`, `countryId`, `area`, `popular`, `GDP`, `desciption`, city["name"], city["country_id"], city["area"], city["poppular"], city["gdp"], city["description"]]);
        await query(createCitySql);

    }

    async deleteCity(id) {
        let deleteSql = `DELETE FROM local_guide.?? WHERE ?? = ?;`;
        deleteSql = mysql.format(deleteSql, ["cities", "Id", id]);
        await query(deleteSql);
    }

    async getCityById(id) {
        try {
            let selectCitiesSql = `SELECT * FROM local_guide.?? WHERE ?? =?`
            selectCitiesSql = mysql.format(selectCitiesSql, ["cities", "Id", id])
            let country = await query(selectCitiesSql);
            // console.log(selectCitiesSql)
            // console.log(cities)
            return JSON.parse(JSON.stringify(country))

        } catch (err) {
            console.log(err.message)
        }
    }

    // async getCountryById(id) {
    //     try {
    //         let selectCitiesSql = `
    //     SELECT * FROM
    //     local_guide. ?? WHERE`
    //         selectCitiesSql = mysql.format(selectCitiesSql, ["country"])
    //         let country = await query(selectCitiesSql);
    //         // console.log(selectCitiesSql)
    //         // console.log(cities)
    //         return JSON.parse(JSON.stringify(country))
    //
    //     } catch (err) {
    //         console.log(err.message)
    //     }
    // }


    // get all Customers
    async getOrders() {
        let orders = [];
        try {
            // safe from unescaped input
            const sql = `
        SELECT ?? ,
    ?? , ??, ??
        FROM ??
        INNER
        JOIN ??
        ON ?? =
    ??
        `;
            const selectSql = mysql.format(sql, ["customers.customerName", "orders.orderID", "orders.orderDate", "orders.orderTotalPrice", "orders", "customers", "orders.customerId", "customers.customerId"]);
            orders = await query(selectSql);

        } catch (err) {
            console.log(err.message);
        }
        return JSON.parse(JSON.stringify(orders));
    }

    async updateCity(id, city) {


    }

}

module.exports = new CityModel();