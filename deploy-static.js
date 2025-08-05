// Simple static deployment script for GitHub Pages
const fs = require('fs');
const path = require('path');

// Create a simple index.html that redirects to terrigraphic-index.html
const indexContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thrishank P - Terrigraphic Portfolio</title>
    <meta http-equiv="refresh" content="0; url=./terrigraphic-index.html">
    <link rel="canonical" href="./terrigraphic-index.html">
</head>
<body>
    <p>Redirecting to <a href="./terrigraphic-index.html">Terrigraphic Portfolio</a>...</p>
</body>
</html>`;

// Write the index.html file
fs.writeFileSync('index.html', indexContent);
console.log('✅ Created index.html for GitHub Pages deployment');

// Create a simple 404.html for GitHub Pages
const notFoundContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Not Found - Terrigraphic</title>
    <meta http-equiv="refresh" content="3; url=./terrigraphic-index.html">
    <style>
        body {
            font-family: 'Orbitron', sans-serif;
            background: linear-gradient(135deg, #0a0a0a, #1a1a2e);
            color: #44ffcc;
            text-align: center;
            padding: 50px;
            margin: 0;
        }
        h1 { font-size: 3rem; margin-bottom: 20px; }
        p { font-size: 1.2rem; margin-bottom: 30px; }
        a { color: #44ffcc; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <p>Redirecting to <a href="./terrigraphic-index.html">Terrigraphic Portfolio</a> in 3 seconds...</p>
</body>
</html>`;

fs.writeFileSync('404.html', notFoundContent);
console.log('✅ Created 404.html for GitHub Pages');

console.log('🚀 Static deployment files ready for GitHub Pages!');
