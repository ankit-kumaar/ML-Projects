let candyData = {
    name: '',
    description: '',
    price: 0,
    quantity: 0
};

function addCandy(newCandyData) {
    candyData = newCandyData;
}

function getCandy() {
    return candyData;
}

function buyCandy(quantityToBuy) {
    if (candyData.quantity >= quantityToBuy) {
        candyData.quantity -= quantityToBuy;
        return true;
    }
    return false;
}

module.exports = {
    addCandy,
    getCandy,
    buyCandy
};
