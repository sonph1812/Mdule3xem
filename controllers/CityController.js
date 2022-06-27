const {fs, mysql, query, qs, url, path, getLayout} = require("../config/controller")
const cityModel = require("../models/CityModel")

class CityController {
    constructor() {
    }

    static getLayout(req, res) {
        return getLayout.getLayout(req, res);
    }

    async index(req, res) {

        if (req.method === "GET") {
            let html = '';
            const cities = await cityModel.getCities()
            for (let i = 0; i < cities.length; i++) {
                let city = cities[i];
                let index = i;
                try {
                    if (city) {
                        let country = (await cityModel.getCountryById(city["countryId"]))[0];
                        html += '<tr>';
                        html += `<td>${index + 1}</td>`
                        html += `<td>${city["name"]}</td>`
                        html += `<td>${country["name"]}</td>`
                        html += `<td>${city["area"]}</td>`
                        html += `<td>${city["popular"]}</td>`
                        html += `<td>${city["GDP"]}</td>`
                        html += `<td>${city["desciption"]}</td>`
                        html += `<td><a href="/city/detail?id=${city["Id"]}&index=${index}"><button class="btn btn-warning text-light">Detail</button></a></td>`
                        html += `<td><a href="/city/delete?id=${city["Id"]}&index=${index}"><button class="btn btn-danger">Delete</button></a></td>`
                        html += `<td><a href="/city/update?id=${city["Id"]}&index=${index}"><button class="btn btn-primary">Update</button></a></td>`
                        html += '</tr>';
                    }
                } catch (err) {
                    console.log(err.message);
                }

            }
            let data = "";
            try {
                data = fs.readFileSync('./views/cities/cities.html', 'utf-8');
            } catch (err) {
                console.log(err.message);
                data = err.message;
            }
            console.log()

            res.writeHead(200, {'Content-Type': 'text/html'});
            data = data.replace('{list-cities}', html);
            let display = getLayout.getLayout(req, res).replace('{content}', data)
            res.write(display);
            return res.end();
        } else {
            // If method === "POST"
        }

        return res.end("day la trang homepage")
    }

    async notfound(req, res) {
        return res.end("404 Not Found")

    }

    // /create
    async create(req, res) {

        if (req.method === "GET") {
            let country = [];
            fs.readFile('./views/cities/create.html', 'utf-8', async function (err, data) {
                if (err) {
                    console.log(err);
                }
                let html = "";
                let countryOption = "";
                res.writeHead(200, {'Content-Type': 'text/html'});
                // add Customers Name to option

                country = await cityModel.getCountry();
                country.forEach((country) => {
                    countryOption += `<option value="${country["Id"]}">${country["name"]}</option>`
                })
                data = data.replace('{country-name}', countryOption)
                html = getLayout.getLayout(req, res).replace('{content}', data);
                res.write(html);
                return res.end();
            });
            // when method === "POST"
        } else {
            let data = "";
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', async () => {
                let city = qs.parse(data);

                // return res.end("da nhan dc city");

                try {
                    await cityModel.createCity(city);
                } catch (err) {
                    console.log(err.message)
                }
                // -- end
                res.writeHead(302, {
                    location: "/"
                });
                return res.end();
            })

            req.on('error', () => {
                console.log('error')
            })
        }
    }

    // get detail orders
    async detail(req, res) {
        let index = url.parse(req.url, true).query.index;
        let id = url.parse(req.url, true).query.id;
        if (req.method === "GET") {
            let html = '';
            const city = (await cityModel.getCityById(id))[0];
            const country = (await cityModel.getCountryById(city["countryId"]))[0]

            city.country = country["name"];

            let detailApi = JSON.stringify(city)
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(detailApi);
            return res.end();
        } else {
            // If method === "POST"
        }
    }


    // /delete
    async delete(req, res) {
        let index = url.parse(req.url, true).query.index;
        let id = url.parse(req.url, true).query.id;
        if (req.method === "GET") {
            let html = '';
            try {
                html += `<a href="/city/delete?id=${id}&index=${index}"><form method="POST"><button class="btn btn-primary">Delete</button></form></a>`

            } catch (err) {
                html = "Load data fail!";
                console.log(err.message);
            }
            let data = "";
            try {
                data = fs.readFileSync('./views/cities/delete.html', 'utf-8')
            } catch (err) {
                data = err.message;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            data = data.replace('{delete-city}', html);
            let display = getLayout.getLayout(req, res).replace('{content}', data)
            res.write(display);
            return res.end();

        } else {
            // console.log(order, id)
            // return res.end("")
            await cityModel.deleteCity(id);
            res.writeHead(302, {
                location: "/"
            });
            return res.end();
        }
    }

    // /update a record
    async update(req, res) {
        let index = url.parse(req.url, true).query.index;
        let id = url.parse(req.url, true).query.id;
        if (req.method === "GET") {
            let country = [];
            const city = (await cityModel.getCityById(id))[0];

            fs.readFile('./views/cities/update.html', 'utf-8', async function (err, data) {
                if (err) {
                    console.log(err);
                }
                let html = "";
                let countryOption = "";
                res.writeHead(200, {'Content-Type': 'text/html'});
                country = await cityModel.getCountry();
                country.forEach((country) => {
                    countryOption += `<option value="${country["Id"]}"  {${country["Id"]}-selected} >${country["name"]}</option>`
                })
                countryOption = countryOption.replace(`{${city["countryId"]}-selected}`, "selected");

                data = data.replace('{country-name}', countryOption);
                data = data.replace('{name-city}', city["name"]);
                data = data.replace('{area-city}', city["area"]);
                data = data.replace('{popular-city}', city["popular"]);
                data = data.replace('{gdp-city}', city["GDP"]);
                data = data.replace('{descriptipn-city}', city["desciption"]);

                html = getLayout.getLayout(req, res).replace('{content}', data);
                res.write(html);
                return res.end();
            });

        } else {
            let data = "";
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', async () => {
                let city = qs.parse(data);
                let Id = id;


                await cityModel.updateCity(id, city);

                res.writeHead(302, {
                    location: "/"
                });
                return res.end();
            })

            req.on('error', () => {
                console.log('error')
            })
        }
    }

}

module.exports = new CityController();