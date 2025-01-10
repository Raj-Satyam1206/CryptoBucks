# CryptoBucks

**CryptoBucks** is a cryptocurrency tracking application built with React.js. It enables users to view trending cryptocurrencies, filter and search for coins, and manage saved cryptocurrencies using local storage.

## Features

- View trending cryptocurrencies.
- Search and filter cryptocurrencies based on various criteria.
- Detailed coin information with charts and market trends.
- Pagination for browsing cryptocurrency lists efficiently.
- Save favorite cryptocurrencies locally for quick access.

## Project Structure

### Pages

1. **Crypto.js**  
   Displays cryptocurrency data with filter options and a paginated table.

2. **Saved.js**  
   Manages locally saved cryptocurrencies using local Storage.

3. **Trending.js**  
   Displays trending cryptocurrencies.

4. **Home.js**  
   Landing page with navigation to Crypto, Saved, and Trending pages.

### Components

- **Chart:** Displays market data in graphical format.
- **CryptoDetails:** Shows detailed information about a selected cryptocurrency.
- **Filter:** Provides search, currency selection, and sorting options.
- **Logo:** Displays the app's logo.
- **Navigation:** Navigation bar for seamless page transitions.
- **Pagination:** Handles pagination for cryptocurrency lists.
- **Search:** Allows users to search for specific cryptocurrencies.
- **Table Component:** Renders cryptocurrency data in a tabular format.
- **TrendingCoin:** Displays individual trending coins.

### Context

- **Crypto Context:** Manages global cryptocurrency data, filters, and API calls.
- **Storage Context:** Handles local storage and saved cryptocurrencies.
- **Trending Context:** Manages data for trending cryptocurrencies.

## How It Works

### Main Workflow

1. **Routing**  
   The `index.js` file defines routes for **Crypto**, **Trending**, and **Saved** pages.

2. **Home.js**  
   Acts as the entry point and integrates navigation using the **Logo** and **Navigation** components.

3. **Crypto.js**

   - Utilizes the **Filter** component for search, sorting, and currency selection.
   - Displays data using the **Table** and **Pagination** components.
   - Data is fetched using the CryptoContext API.

4. **Saved.js**

   - Manages saved cryptocurrencies stored locally.
   - Fetches data for saved coins using the **Storage Context**.

5. **Trending.js**
   - Displays trending cryptocurrencies fetched from the API.

### APIs

- **CryptoContext** fetches data from the [CoinGecko API](https://www.coingecko.com/en/api).
- API Endpoints used:
  - `/coins/markets` for cryptocurrency data.
  - `/search` for searching cryptocurrencies.
  - `/coins/{id}` for detailed coin data.

## Future Enhancements

- Add user authentication for personalized features.
- Implement advanced charts for data visualization.
- Support for multiple languages and fiat currencies.
