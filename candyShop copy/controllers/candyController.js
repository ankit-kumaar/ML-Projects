const Candy = require("../models/candy");

exports.addCandy = async (req, res) => {
    try {
        const { candyName, description, price, quantity } = req.body;
        await Candy.create({
            candyName,
            description,
            price,
            quantity
        });
        res.status(201).send("Candy added successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getCandy = async (req, res) => {
    try {
        const candies = await Candy.findAll();
        res.status(200).json(candies);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


exports.buyCandy = async (req, res) => {
    try {
        const { candyId, quantity } = req.body;
        const candy = await Candy.findByPk(candyId);
        if (!candy) {
            res.status(404).send("Candy not found.");
            return;
        }

        if (candy.quantity >= quantity) {
            candy.quantity -= quantity;
            await candy.save();
            res.status(200).send("Candy bought successfully.");
        } else {
            res.status(400).send("Not enough quantity available.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};



