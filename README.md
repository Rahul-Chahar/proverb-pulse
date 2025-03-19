# 📜 Random Quote Generator with Dynamic Colors & Export Feature  

> **A simple web app that fetches random quotes, dynamically changes background colors, and allows users to download the quote as an image.**  

## 🚀 **Live Demo**  
👉 *[Click here to see it in action!](#)* *(https://proverb-pulse.vercel.app/)*  

---

## 📌 **Features**  
✅ Fetches **random motivational quotes**  
✅ **Changes background colors** dynamically  
✅ **Copy** quotes with a click  
✅ **Tweet** the quote directly  
✅ **Export** the quote as an image  
✅ **Ensures unique quotes** by avoiding recent duplicates  

---

## 📷 **Preview**  
> 🔹 The app has a dark quote container for better visibility, while the outer background changes dynamically.  

![Quote Generator Preview](F:\Code\CHAI-CODE\JS Assignment 3\Random Quotes Generator\Screenshot 2025-03-19 125631.png)  


---

## 🛠️ **Tech Stack**  
- HTML  
- CSS  
- JavaScript  
- `html2canvas` (for downloading quotes as images)  

---

## 🏗️ **Project Structure**  

```
/quote-generator/
│── index.html         # Main HTML structure
│── styles.css         # CSS for styling
│── script.js          # JavaScript for fetching quotes and handling UI
│── README.md          # This file!
```

---

## 🎨 **How Colors Change?**  

To keep things **visually appealing**, the app:  
✅ Uses a **dark color** for the quote container for better text readability  
✅ Uses a **lighter shade** of the same color for the background  
✅ Changes the colors every time a new quote is generated  

💡 **Example of Color Pairs Used:**  
| Container (Dark) | Background (Light) |
|------------------|--------------------|
| `#1a1a1a` | `#3d3d3d` |
| `#1b263b` | `#415a77` |
| `#283618` | `#606c38` |

---

## 🧠 **Why We Use `Set()` to Avoid Repeated Quotes?**  

One common problem in quote generators is that **quotes repeat too frequently**. To **fix this**, we use a JavaScript `Set()`.

### 🔍 **What is a `Set()`?**  
A `Set()` is a **special data structure** in JavaScript that **stores unique values**. Unlike arrays, it **automatically removes duplicates**.

### 📌 **How We Use `Set()` Here?**  

- We **store recent quotes** in a `Set()`.  
- When fetching a new quote, we **check if it's already in the Set**.  
- If it's a duplicate, we **fetch another one**.  
- If the `Set()` grows too big (e.g., **more than 5 quotes stored**), we **clear it** to save memory.  

### 📝 **Example Code Snippet**  
```javascript
let recentQuotes = new Set(); // Stores unique quotes

async function fetchQuote() {
    const response = await fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random");
    const data = await response.json();
    
    if (data.success) {
        const quote = data.data.content;
        if (recentQuotes.has(quote)) return fetchQuote(); // Fetch again if duplicate
        if (recentQuotes.size > 5) recentQuotes.clear(); // Keep memory optimized

        recentQuotes.add(quote);
        document.getElementById("quoteDisplay").innerText = quote;
    }
}
```

### 🖼️ **Visual Explanation**
**Without `Set()`**:  
💬 *"Believe in yourself"* → 💬 *"Believe in yourself"* → 💬 *"Stay strong"*  
*(Repeats happen too often!)*  

**With `Set()`**:  
💬 *"Believe in yourself"* → 💬 *"Stay strong"* → 💬 *"Work hard"*  
*(No immediate repetition!)*  

---

## ⚡ **How to Use?**  

1️⃣ **Open the Web App** *(or run it locally)*  
2️⃣ Click **"New Quote"** to generate a random quote  
3️⃣ Click **"Copy"** to copy the quote  
4️⃣ Click **"Tweet"** to share it on Twitter  
5️⃣ Click **"Download"** to save the quote as an image  

---

## 📥 **Installation & Running Locally**  

1️⃣ **Clone this repo:**  
```sh
git clone https://github.com/your-username/quote-generator.git
```
2️⃣ **Open the folder:**  
```sh
cd quote-generator
```
3️⃣ **Run the `index.html` in your browser.**  

---

## 📌 **Code Breakdown**  

### **HTML (`index.html`)**
👉 Creates a **quote container** & **buttons**.  
👉 Uses `html2canvas` for downloading the quote as an image.  
```html
<div class="container" id="quoteContainer">
    <p id="quoteDisplay">Fetching quote...</p>
    <p id="authorDisplay">— Author</p>
</div>

<button id="generateButton">New Quote</button>
<button id="copyButton">Copy</button>
<button id="tweetButton">Tweet</button>
<button id="exportButton">Download</button>
```

---

### **CSS (`styles.css`)**
👉 Uses **dark colors** for the container and **lighter colors** for the background.  
👉 **Smooth transitions** for a better experience.  

```css
.container {
    background-color: #222; /* Dark */
    color: white;
    padding: 20px;
    text-align: center;
}
body {
    background-color: #ececec; /* Light */
}
```

---

### **JavaScript (`script.js`)**
👉 Fetches **random quotes** from API.  
👉 Uses `Set()` to **avoid duplicate quotes**.  
👉 **Changes colors dynamically**.  
👉 **Downloads the container as an image** using `html2canvas`.  

```javascript
let recentQuotes = new Set(); // Avoid duplicates

async function fetchQuote() {
    const response = await fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random");
    const data = await response.json();
    
    if (recentQuotes.has(data.data.content)) return fetchQuote();
    if (recentQuotes.size > 5) recentQuotes.clear(); 
    
    recentQuotes.add(data.data.content);
    document.getElementById("quoteDisplay").innerText = `"${data.data.content}"`;
}

document.getElementById("generateButton").addEventListener("click", fetchQuote);
```

---

## 🤔 **Why This Approach?**
✅ **No repeated quotes** (thanks to `Set()`)  
✅ **No unreadable text** (dark/light color pairing)  
✅ **Better user experience** (smooth transitions)  
✅ **Easy to use & expand** (simple, clean code)  

---

## 🛠️ **Future Improvements**  
🚀 Add **favorite quotes** feature  
🚀 Add **more APIs** for different types of quotes  
🚀 Improve **UI animations**  

---

## 📜 **License**
📝 Free to use and modify! 🚀  

---

## 📩 **Contributions**
Got an idea to improve this? Feel free to **submit a PR**! 🙌  

---
