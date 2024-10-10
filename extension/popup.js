document.addEventListener("DOMContentLoaded", () => {
  console.log("Popup loaded");
  chrome.storage.sync.get("apiUrl", ({ apiUrl }) => {
    const handleTabs = (callback) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        callback(tabs[0].url, tabs[0].id);
      });
    };

    const fetchProductByAsin = (asin, apiUrl) =>
      fetch(`${apiUrl}/products/${asin}/find-by-asin`).then((response) =>
        response.json()
      );

    const fetchPriceHistory = (productId, apiUrl) =>
      fetch(`${apiUrl}/products/${productId}/price-history`).then((response) =>
        response.json()
      );

    const displayPriceHistory = (data) => {
      const priceHistoryList = document.getElementById("priceHistory");
      priceHistoryList.innerHTML = "";
      if (data.length === 0) {
        alert("No price history available. Please check again later.");
      } else {
        data.slice(-5).forEach((record) => {
          const listItem = document.createElement("li");
          listItem.innerHTML = `<span class="price">$${
            record.price
          }</span> <span class="price-date">${new Date(
            record.checked_at
          ).toLocaleString()}</span>`;
          priceHistoryList.appendChild(listItem);
        });
      }
    };

    const handleError = (error) => {
      console.error("Error:", error);
      alert("An error occurred. Please check the console for details.");
    };

    const processProductAsin = (url, apiUrl) => {
      const productAsin = getAsinFromUrl(url);
      if (!productAsin) {
        alert("Please enter a valid product ID.");
        return;
      }

      fetchProductByAsin(productAsin, apiUrl)
        .then((product) => {
          if (product && product.id) {
            fetchPriceHistory(product.id, apiUrl)
              .then(displayPriceHistory)
              .catch(handleError);
          } else {
            alert("Product not found in the database. Please add it first.");
          }
        })
        .catch(handleError);
    };

    document
      .getElementById("addCurrentProduct")
      .addEventListener("click", () => {
        handleTabs((url, tabId) => {
          chrome.tabs.sendMessage(tabId, { action: "getProductUrl" });
        });
      });

    document
      .getElementById("captureCurrentUrl")
      .addEventListener("click", () => {
        handleTabs((url) => processProductAsin(url, apiUrl));
      });

    document
      .getElementById("checkPriceHistory")
      .addEventListener("click", () => {
        handleTabs((url) => processProductAsin(url, apiUrl));
      });
  });

  function getAsinFromUrl(url) {
    // Expresión regular para capturar el ASIN
    const asinRegex = /\/(?:dp|gp\/product)\/([A-Z0-9]{10})/i;
    // Ejecutar la expresión regular en la URL
    const match = url.match(asinRegex);
    // Si hay un match, devolver el ASIN
    if (match && match[1]) {
      return match[1];
    } else {
      return null; // No se encontró ASIN
    }
  }
});


