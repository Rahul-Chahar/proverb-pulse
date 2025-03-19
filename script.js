document.addEventListener("DOMContentLoaded", function () {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const authorDisplay = document.getElementById("authorDisplay");
    const generateButton = document.getElementById("generateButton");
    const copyButton = document.getElementById("copyButton");
    const tweetButton = document.getElementById("tweetButton");
    const exportButton = document.getElementById("exportButton");
    const container = document.getElementById("quoteContainer");
    const body = document.body;

    let currentQuote = "";
    let recentQuotes = new Set();

    function getRandomColor() {
        const colors = [
            ["#1a1a1a", "#3d3d3d"], // Dark gray & lighter gray
            ["#1b263b", "#415a77"], // Dark blue & lighter blue
            ["#283618", "#606c38"], // Dark green & olive green
            ["#3b2f2f", "#765757"], // Brown tones
            ["#2c2c54", "#474787"]  // Dark purple & light purple
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    async function fetchQuote() {
        try {
            const response = await fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random");
            const data = await response.json();

            if (data.success) {
                const quote = data.data.content;
                const author = data.data.author || "Unknown";

                if (recentQuotes.has(quote)) return fetchQuote();
                if (recentQuotes.size > 5) recentQuotes.clear();
                recentQuotes.add(quote);

                currentQuote = `"${quote}"`;
                quoteDisplay.innerText = currentQuote;
                authorDisplay.innerText = `\n— ${author}`;

                changeColors(); // Change background colors
            } else {
                quoteDisplay.innerText = "Failed to fetch quote. Try again!";
            }
        } catch (error) {
            quoteDisplay.innerText = "Error fetching quote!";
        }
    }

    function changeColors() {
        const [darkColor, lightColor] = getRandomColor();
        container.style.backgroundColor = darkColor;
        body.style.backgroundColor = lightColor;
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(`${currentQuote} ${authorDisplay.innerText}`).then(() => {
            alert("Quote copied!");
        }).catch(() => {
            alert("Failed to copy!");
        });
    }

    function shareOnTwitter() {
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(currentQuote + " " + authorDisplay.innerText)}`;
        window.open(tweetUrl, "_blank");
    }

    function exportAsImage() {
        html2canvas(container).then(canvas => {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "quote.png";
            link.click();
        });
    }

    generateButton.addEventListener("click", fetchQuote);
    copyButton.addEventListener("click", copyToClipboard);
    tweetButton.addEventListener("click", shareOnTwitter);
    exportButton.addEventListener("click", exportAsImage);

    fetchQuote();
});
