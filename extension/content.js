chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("content loaded");
  if (request.action === "getProductUrl") {
    chrome.storage.sync.get("apiUrl", ({ apiUrl }) => {
      const url = window.location.href;
      const title = document.getElementById("productTitle")?.textContent.trim();
      console.log("Product URL:", url);
      console.log("Product Title:", title);
      const thresholdPrice = prompt("Enter threshold price for this product:");

      if (thresholdPrice && title) {
        fetch(`${apiUrl}/products`, {
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
            alert("An error occurred. Please check the console for details.");
          });
      } else {
        alert("Failed to retrieve product information. Please try again.");
      }
    });
  }
});
