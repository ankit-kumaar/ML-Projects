document.addEventListener("DOMContentLoaded", () => {
    const candyForm = document.getElementById("candyForm");
    const addItemButton = document.getElementById("addItemButton");
    const candyDetails = document.getElementById("candyDetails");
    const buyButtons = document.getElementById("buyButtons");

    addItemButton.addEventListener("click", async () => {
        const candyName = document.getElementById("candyName").value;
        const description = document.getElementById("description").value;
        const price = parseFloat(document.getElementById("price").value);
        const quantity = parseInt(document.getElementById("quantity").value);

        const response = await fetch("/addCandy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                candyName,
                description,
                price,
                quantity
            })
        });

        if (response.ok) {
            fetchCandyDetails();
            candyForm.reset();
        } else {
            console.error("Failed to add candy.");
        }
    });

    async function fetchCandyDetails() {
        const response = await fetch("/getCandy");
        const candies = await response.json();

        candyDetails.innerHTML = "";
        candies.forEach(candy => {
            const candyDiv = document.createElement("div");
            candyDiv.innerHTML = `
                <p><strong>Name:</strong> ${candy.candyName}</p>
                <p><strong>Description:</strong> ${candy.description}</p>
                <p><strong>Price:</strong> ${candy.price}</p>
                <p><strong>Quantity:</strong> ${candy.quantity}</p>
            `;
            const buyButtonsDiv = document.createElement("div");
            buyButtonsDiv.className = "buyButtons";
            buyButtonsDiv.innerHTML = `
                <button class="buyButton" data-id="${candy.id}" data-quantity="1">Buy 1</button>
                <button class="buyButton" data-id="${candy.id}" data-quantity="2">Buy 2</button>
                <button class="buyButton" data-id="${candy.id}" data-quantity="3">Buy 3</button>
            `;
            candyDiv.appendChild(buyButtonsDiv);
            candyDetails.appendChild(candyDiv);
        });

        setupBuyButtons();
    }

    function setupBuyButtons() {
        const buyButtons = document.querySelectorAll(".buyButton");
        buyButtons.forEach(button => {
            button.addEventListener("click", async () => {
                const candyId = button.getAttribute("data-id");
                const quantityToBuy = parseInt(button.getAttribute("data-quantity"));
                const response = await fetch("/buyCandy", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        candyId,
                        quantity: quantityToBuy
                    })
                });

                if (response.ok) {
                    fetchCandyDetails();
                } else {
                    console.error("Failed to buy candy.");
                }
            });
        });
    }

    fetchCandyDetails();
});
