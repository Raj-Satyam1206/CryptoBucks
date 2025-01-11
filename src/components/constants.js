export const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json', 
        'x-cg-demo-api-key': process.env.REACT_APP_COINGECKO_API_KEY,
    },
};