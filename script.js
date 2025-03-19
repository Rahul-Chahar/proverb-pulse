document.addEventListener("DOMContentLoaded", function () {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const generateButton = document.getElementById("generateButton");
    const copyButton = document.getElementById("copyButton");
    const tweetButton = document.getElementById("tweetButton");

    let quoteHistory = new Set();
    const historyLimit = 10;
    const UNSPLASH_ACCESS_KEY = "write key"; // 🔹 Replace with your Unsplash Access Key

    async function fetchQuote() {
        try {
            const response = await fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random");
            const data = await response.json();

            if (data.success) {
                const quote = data.data.content || "No quote found";
                const author = data.data.author || "Unknown";
                const newQuote = `"${quote}" - ${author}`;

                if (quoteHistory.has(newQuote)) {
                    return fetchQuote();
                }

                quoteHistory.add(newQuote);
                if (quoteHistory.size > historyLimit) {
                    quoteHistory.delete(quoteHistory.values().next().value);
                }

                quoteDisplay.innerHTML = newQuote;
                fetchBackgroundImage(); 
            } else {
                quoteDisplay.innerHTML = "Failed to fetch quote. Try again!";
            }
        } catch (error) {
            quoteDisplay.innerHTML = "Error fetching quote!";
        }
    }

    async function fetchBackgroundImage() {
        try {
            const response = await fetch(`https://api.unsplash.com/photos/random?query=nature,abstract&client_id=${UNSPLASH_ACCESS_KEY}`);
            const data = await response.json();
            document.body.style.backgroundImage = `url(${data.urls.regular})`;
        } catch (error) {
            console.log("Error fetching background image", error);
        }
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(quoteDisplay.innerText).then(() => {
            alert("Quote copied!");
        }).catch(() => {
            alert("Failed to copy!");
        });
    }

    function shareOnTwitter() {
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteDisplay.innerText)}`;
        window.open(tweetUrl, "_blank");
    }

    generateButton.addEventListener("click", fetchQuote);
    copyButton.addEventListener("click", copyToClipboard);
    tweetButton.addEventListener("click", shareOnTwitter);

    fetchQuote();
});
