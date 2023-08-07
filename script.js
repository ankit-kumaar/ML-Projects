document.addEventListener('DOMContentLoaded', () => {
    const candyForm = document.getElementById('candyForm');
    const candyDetails = document.getElementById('candyDetails');
    const detailName = document.getElementById('detailName');
    const detailDescription = document.getElementById('detailDescription');
    const detailPrice = document.getElementById('detailPrice');
    const detailQuantity = document.getElementById('detailQuantity');
    const buy1 = document.getElementById('buy1');
    const buy2 = document.getElementById('buy2');
    const buy3 = document.getElementById('buy3');

    async function updateCandyDetails() {
        try {
            const response = await fetch('/api/get-candy');
            if (response.ok) {
                const candyData = await response.json();
                detailName.textContent = candyData.name;
                detailDescription.textContent = candyData.description;
                detailPrice.textContent = candyData.price.toFixed(2);
                detailQuantity.textContent = candyData.quantity;
            } else {
                console.error('Failed to fetch candy details');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    document.getElementById('addItem').addEventListener('click', async () => {
        const candyData = {
            name: document.getElementById('candyName').value,
            description: document.getElementById('description').value,
            price: parseFloat(document.getElementById('price').value),
            quantity: parseInt(document.getElementById('quantity').value)
        };

        try {
            const response = await fetch('/api/add-candy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(candyData)
            });

            if (response.ok) {
                await updateCandyDetails();
                candyForm.classList.add('hidden');
                candyDetails.classList.remove('hidden');
            } else {
                console.error('Failed to add candy item');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    async function buyCandy(quantityToBuy) {
        try {
            const response = await fetch('/api/buy-candy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity: quantityToBuy })
            });

            if (response.ok) {
                await updateCandyDetails();
            } else {
                console.error('Purchase failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    buy1.addEventListener('click', () => buyCandy(1));
    buy2.addEventListener('click', () => buyCandy(2));
    buy3.addEventListener('click', () => buyCandy(3));

    // Initial candy details update
    updateCandyDetails();
});
