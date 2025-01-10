// const http = require('http');
// const fs = require('fs');

// // Function to log requests
// const logRequest = (url) => {
//     const dateTime = new Date().toISOString(); // Current date and time
//     const logEntry = `${dateTime} - ${url}\n`; // Format log entry
//     fs.appendFile('log.txt', logEntry, (err) => {
//         if (err) {
//             console.error('Error logging request:', err);
//         }
//     });
// };

// const server = http.createServer((req, res) => {
//     logRequest(req.url);
//     if (req.url === "/") {
//         res.write("Welcome to BarterX");
//         res.end()
//     }
//     else if (req.url === "/products") {
//         res.write("Here are the products up for Sale in BarterX")
//         res.end()
//     }
//     else if (req.url === "/login") {
//         res.write("Login to the BarterX")
//         res.end()
//     }
//     else if (req.url === "/signup") {
//         res.write("Sign up to the BarterX")
//         res.end()
//     }
//     else if (req.url === "/profile") {
//         res.write("Trader Profile")
//         res.end()
//     }
//     else if (req.url === "/cart") {
//         res.write("Your Shopping Cart is here")
//         res.end()
//     }
//     else if (req.url === "/checkout") {
//         res.write("Lets' start shipping")
//         res.end()
//     }
//     else if (req.url === "/orders") {
//         res.write("Your Orders are here")
//         res.end()
//     }
//     else if (req.url === "/categories") {
//         res.write("Browse Categories")
//         res.end()
//     }
//     else if (req.url === "/chat") {
//         res.write("Your Chat with fellow Traders")
//         res.end()
//     }
//     else if (req.url === "/contact") {
//         res.write("Contact Us at")
//         res.end()
//     }
//     else if (req.url === "/about") {
//         res.write("The modern approach to trading our commodities")
//         res.end()
//     }
//     else {
//         res.writeHead(404)
//         res.write("Page not found")
//         res.end()
//     }
// })

// server.listen(8050, () => {
//     console.log("Server is running on port http://localhost:8050/")
// })

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
