# 💰 CryptoBucks  

A modern **cryptocurrency tracking application** built with **React.js** that allows users to explore trending cryptocurrencies, search and filter coins, and manage saved favorites using local storage.  

🔗 **Live Demo**: [CryptoBucks on Netlify](https://cryptocurrency-bucks.netlify.app/)  

---

## 🚀 Features  
- 🔥 View **trending cryptocurrencies** in real time  
- 🔎 **Search and filter** cryptocurrencies based on name, market cap, and price  
- 📊 **Detailed coin information** with charts and market trends  
- 📑 **Pagination** for browsing large lists of coins  
- ⭐ Save favorite cryptocurrencies **locally** for quick access  

---

## 📂 Project Structure  

### 🖥 Pages  
- **Home.js** → Landing page with navigation  
- **Crypto.js** → Displays crypto data with filters and pagination  
- **Saved.js** → Manage and view locally saved cryptocurrencies  
- **Trending.js** → Showcases trending cryptocurrencies  

### ⚛️ Components  
- `Chart` → Graphical market data visualization  
- `CryptoDetails` → Detailed coin info  
- `Filter` → Search, currency selection & sorting  
- `Logo` → App logo  
- `Navigation` → Navbar for smooth transitions  
- `Pagination` → Efficient page browsing  
- `Search` → Quick coin search  
- `Table` → Tabular display of coin data  
- `TrendingCoin` → Renders each trending coin  

### 🌐 Context  
- **Crypto Context** → Manages API data, filters, and global states  
- **Storage Context** → Handles local storage for saved cryptos  
- **Trending Context** → Manages trending crypto data  

---

## ⚙️ How It Works  

1. **Routing** → `index.js` defines routes for Crypto, Trending, and Saved pages.  
2. **Crypto.js** → Fetches coin data via **CryptoContext**, integrates search, filter, and pagination.  
3. **Saved.js** → Fetches and manages locally stored favorite coins via **Storage Context**.  
4. **Trending.js** → Fetches trending crypto data via **Trending Context**.  

---

## 🌍 API Integration  
Powered by [CoinGecko API](https://www.coingecko.com/en/api):  
- `/coins/markets` → Market data  
- `/search` → Search cryptocurrencies  
- `/coins/{id}` → Detailed coin data  

---

## 🛠 Tech Stack  
- **React.js** ⚛️  
- **Context API** for state management  
- **CoinGecko API** for real-time crypto data  
- **Local Storage** for persistence  

---

## 📌 Prerequisites  
Before running this project, ensure you have:  
- **Node.js** (>= 14.x)  
- **npm** or **yarn** installed  

---

## 🏃 How to Run the Application  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Raj-Satyam1206/CryptoBucks.git
   cd CryptoBucks
   ```  

2. **Install dependencies**  
   ```bash
   npm install
   ```  

3. **Start the development server**  
   ```bash
   npm start
   ```  

4. Open **http://localhost:3000/** in your browser 🎉  

---

## 🔮 Future Enhancements  
- 🔐 Add **user authentication** for personalization  
- 📈 Implement **advanced charting & analytics**  
- 🌎 Support for **multiple languages & fiat currencies**  
