chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getProductUrl") {
        const url = window.location.href;
        const title = document
            .getElementById("productTitle")
            ?.textContent.trim();
        const thresholdPrice = prompt(
            "Enter threshold price for this product:"
        );

        if (thresholdPrice && title) {
            fetch("http://monitoriza-con-sonrisa.test/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    url,
                    title,
                    threshold_price: parseFloat(thresholdPrice),
                }),
            })
                .then((response) => {
                    if (response.status === 201) {
                        alert("Product added for price tracking!");
                    } else {
                        alert("Failed to add product. Please try again.");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert(
                        "An error occurred. Please check the console for details."
                    );
                });
        } else {
            alert("Failed to retrieve product information. Please try again.");
        }
    }
});
