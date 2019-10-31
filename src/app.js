const express = require("express");
const hbs = require("hbs");
const path = require("path");

// local functions
const geocode = require("../src/utils/geocode");
const forecast = require("../src/utils/forecast");

const port = process.env.PORT || 8080;

const app = express();

// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partials = path.join(__dirname, "../templates/partials");

// setup handlebars location & views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partials);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Variables
const name = "Grant Best";
// Routes
app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather",
        name
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name,
    message: "Welcome to my simple weather API built with NodeJS and Express"
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "must provide valid address"
        });
    }
    geocode(req.query.address, (error, { lat, lng, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(lat, lng, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        });
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        res.send({
            error: "You must provide a search term"
        });
    } else {
        console.log(req.query.search);
        res.send({
            products: []
        });
    }
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        message: "Help article not found.",
        name
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        message: "Page not found.",
        name
    });
});

app.listen(port, () => {
    console.log(`App Running on port ${port}`);
});
