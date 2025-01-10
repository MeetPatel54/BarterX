
import fs from 'fs';

// Function to log requests
const logRequest = async (url) => {
    const dateTime = new Date().toISOString();
    const logEntry = `${dateTime} - ${url}\n`;

    try {
        // Append log entry to the file
        fs.appendFile('log.txt', logEntry, (err) => {
            if (err) {
                console.error('Error logging request:', err);
            } else {
                console.log("Log entry added:", logEntry);
            }
        });
    } catch (err) {
        console.error("Error logging request:", err);
    }
};

// Example server code
const server = Bun.serve({
    port: 8050,
    fetch(req) {
        const url = new URL(req.url, `http://${req.headers.host}`); // Parse the URL
        logRequest(url.pathname);
        console.log(`${req.method} Request at ${url.pathname}`);

        switch (url.pathname) {
            case '/':
                return new Response('Welcome to the BarterX');
            case '/products':
                return new Response('Here are the products up for Sale in BarterX');
            case '/login':
                return new Response('Login to the BarterX');
            case '/signup':
                return new Response('Sign up to the BarterX');
            case '/profile':
                return new Response('Trader Profile');
            case '/cart':
                return new Response('Your Shopping Cart is here');
            case '/checkout':
                return new Response("Let's start shipping");
            case '/orders':
                return new Response('Your Orders are here');
            case '/categories':
                return new Response('Browse Categories');
            case '/chat':
                return new Response('Your Chat with fellow Traders');
            case '/contact':
                return new Response('Contact Us at');
            case '/about':
                return new Response('The modern approach to trading our commodities');
            default:
                return new Response('Page not found', { status: 404 });
        }
    },
});

console.log('Server is running on port 8050');
