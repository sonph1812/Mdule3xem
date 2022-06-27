const {mysql, query} = require("../config/controller");

class CityModel {
    constructor() {

    }

    async getCities() {
        try {
            let selectCitiesSql = `SELECT * FROM local_guide.??`
            selectCitiesSql = mysql.format(selectCitiesSql, ["cities"])
            let cities = await query(selectCitiesSql);
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
            return JSON.parse(JSON.stringify(country))

        } catch (err) {
            console.log(err.message)
        }
    }

    async createCity(city) {
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
            return JSON.parse(JSON.stringify(country))

        } catch (err) {
            console.log(err.message)
        }
    }


    async updateCity(id, city) {

        let updateSql = `UPDATE local_guide.?? SET ?? = ?, ?? = ?, ?? = ?, ?? =?, ?? =?, ?? =? WHERE ?? = ?;`;
        updateSql = mysql.format(updateSql, ["cities", "name", city["name"], "countryId", city["country_id"], "area", city["area"], "popular", city["poppular"], "GDP", city["gdp"], "desciption", city["description"], "Id", id]);

        await query(updateSql)


    }

}

module.exports = new CityModel();