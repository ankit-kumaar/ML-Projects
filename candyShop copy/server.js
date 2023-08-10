const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const candyController = require("./controllers/candyController");
const db = require("./db");

//Test the db
db.authenticate()
    .then(() => {
        console.log("Database connection has been established successfully.");
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });

//Sync db
const Candy = require("./models/candy");
db.sync()
    .then(() => {
        console.log("Database synchronized with models.");
    })
    .catch(err => {
        console.error("Unable to synchronize models with the database:", err);
    });

app.use(express.static("public"));
app.use(bodyParser.json());

app.post("/addCandy", candyController.addCandy);
app.get("/getCandy", candyController.getCandy);
app.post("/buyCandy", candyController.buyCandy);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
