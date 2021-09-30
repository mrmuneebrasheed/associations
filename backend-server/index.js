const express = require("express");
const app = express();
const cors = require("cors");
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(cors());
const fs = require("fs");

app.use(express.static("public"));
const associations = require("./associations.json");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const port = 3000;
app.get("/", (req, res) => {
    res.send(associations);
});
app.get("/associations/:name", (req, res) => {
    const name = req.params.name;
    const association = associations.find(
        (company) => name === company.name.toLocaleLowerCase()
    );
    res.send(association);
});
app.post("/form/contact", (req, res) => {
    console.log(req.body);
    fs.writeFileSync("contacts.json", JSON.stringify(req.body));
    res.send("Data Submitted");
});
app.listen(port, () => {
    console.log("Server is currently running on port: " + port);
});
