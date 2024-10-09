document.addEventListener("DOMContentLoaded", () => {
    document
        .getElementById("addCurrentProduct")
        .addEventListener("click", () => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: "getProductUrl",
                });
            });
        });

    document
        .getElementById("checkPriceHistory")
        .addEventListener("click", () => {
            const productId = document.getElementById("productId").value;
            if (productId) {
                fetch(
                    `http://monitoriza-con-sonrisa.test/api/products/${productId}/price-history`
                )
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.length === 0) {
                            alert(
                                "No price history available. Please check again later."
                            );
                        } else {
                            const priceHistoryList =
                                document.getElementById("priceHistory");
                            priceHistoryList.innerHTML = "";
                            data.slice(-5).forEach((record) => {
                                const listItem = document.createElement("li");
                                listItem.textContent = `Price: $${
                                    record.price
                                }, Date: ${new Date(
                                    record.checked_at
                                ).toLocaleString()}`;
                                priceHistoryList.appendChild(listItem);
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        alert(
                            "An error occurred. Please check the console for details."
                        );
                    });
            } else {
                alert("Please enter a valid product ID.");
            }
        });
});
