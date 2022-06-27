const {fs, mysql, query, qs, url, path, getLayout} = require("../config/controller")
const ordersModel = require("../models/OrdersModel")
const cityModel = require("../models/CityModel")

class CityController {
    constructor() {
    }

    static getLayout(req, res) {
        return getLayout.getLayout(req, res);
    }

    async index(req, res) {
        // try {
        //     let cities = await cityModel.getCities();
        //     console.log(cities)
        // } catch (err) {
        //     console.log(err.message);
        // }

        if (req.method === "GET") {
            let html = '';
            const cities = await cityModel.getCities()
            cities.forEach((city, index) => {
                try {
                    if (city) {
                        html += '<tr>';
                        html += `<td>${index + 1}</td>`
                        html += `<td>${city["name"]}</td>`
                        html += `<td>${city["countryId"]}</td>`
                        html += `<td>${city["area"]}</td>`
                        html += `<td>${city["popular"]}</td>`
                        html += `<td>${city["GDP"]}</td>`
                        html += `<td>${city["desciption"]}</td>`
                        html += `<td><a href="/city/detail?id=${city["Id"]}&index=${index}"><button class="btn btn-warning text-light">Detail</button></a></td>`
                        html += `<td><a href="/city/delete?id=${city["Id"]}&index=${index}"><button class="btn btn-danger">Delete</button></a></td>`
                        html += `<td><a href="/citycity/update?id=${city["Id"]}&index=${index}"><button class="btn btn-primary">Update</button></a></td>`
                        html += '</tr>';
                    }
                } catch (err) {
                    console.log(err.message);
                }
            });
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

                console.log(city);
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

            console.log(city)
            console.log(country["name"])
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
            let html = '';
            let cNameOption = "";
            let productsList = "";
            try {
                // get order
                let order = (await ordersModel.getOneOrder(id))[0];
                // convert date format to show
                let date = new Date(order["orderDate"]).toJSON()
                date = date.slice(0, date.length - 14)
                let customersName = await ordersModel.getCustomerName();
                // get {customer-name}
                customersName.forEach((customer) => {
                    if (customer["customerName"] === order["customerName"]) {
                        cNameOption += `<option value="${customer["customerID"]}" selected>
                                ${customer["customerName"]}
                                </option>`
                    } else {
                        cNameOption += `<option value="${customer["customerID"]}">
                                ${customer["customerName"]}
                                </option>`
                    }
                })

                // get product list
                let ProductList = await ordersModel.getProductList(order["orderID"]);

                // get all product list
                let allProductList = await apiModel.getAllProducts();
                allProductList = JSON.parse(allProductList)

                function getProductListOptions(allProductList, productName) {
                    let html = "";
                    allProductList.forEach(product => {
                        if (product["productName"] === productName) {
                            html += `<option value="${product["productId"]}" selected>${product["productName"]}</option>`
                        } else {
                            html += `<option value="${product["productId"]}">${product["productName"]}</option>`
                        }
                    })
                    return html;
                }

                ProductList.forEach((product, index) => {

                    productsList += `<div class="row">
                    <div class="col">
                    <label for="products-list" class="form-label">Choose product ${index + 1}</label>
                    <span class="products-list text-danger"><i class="fa fa-times-circle" aria-hidden="true"></i></span>
                    <select name="product-id-${index}" class="form-select" id="products-list" required>
                        ${getProductListOptions(allProductList, product["productName"])}
                    </select>
                </div>
                <div class="col">
                        <label for="quantity-${index}" class="form-label">Quantity product  ${index + 1}</label>
                    <input type="number" class="form-control" id="quantity-${index}" name="quantity-${index}" placeholder="Quantity"  value = ${product["orderQuantity"]} required>
                </div>
                </div>`
                })

                fs.readFile('./views/orders/update.html', 'utf-8', function (err, data) {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    data = data.replace(/{order-date}/gim, date);
                    data = data.replace(/{customer-name}/gim, cNameOption);
                    data = data.replace('{product-list}', productsList);
                    data = data.replace(/{order-id}/gim, id);
                    data = data.replace(/{order-index}/gim, index);
                    // xử lý selected
                    html = OrdersController.getLayout(req, res).replace('{content}', data);
                    res.write(html);
                    return res.end();
                });

            } catch (err) {
                html = "Load data fail!";
                console.log(err.message);
                res.write(html);
                return res.end();
            }
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