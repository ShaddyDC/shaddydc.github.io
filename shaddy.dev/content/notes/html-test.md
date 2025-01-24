+++
title = "tinytools: easily test your html apps"
date = 2025-04-10T14:53:34+02:00
description = "release of a website to render html in an iframe directly"
tags = [
"release", "tinytools"
]
+++

anthropic claude has the amazing artefact feature, which allows it to generate a web app and
immediately display it next to the chat for you to interact with.
it is phenomenal for prototyping or just iterating quickly on solving a specific problem.
unfortunately, other llms like google gemini do not have this feature
(afaik and ofc you can use alternative guis that do have it).
instead, you have to save the html locally to interact with it in your browser, which is annoying

i therefore present the addition of [HTML Paste Display](https://shaddy.dev/tinytools/?tool=html-test)
to my tinytools collection.
you can just paste some html and see the result live.

it has some clear limitations in comparison to claude:
it is not inline and you have to switch to another tab to use it.
moreover, it only supports plain html rather than the fancy react apps with shadcn components that
claude supports.
but very often, it is enough

case in point, in an earlier [conversation](https://claude.ai/chat/8001c4ac-15b7-4b18-bfa1-023c31d3bf68),
claude failed to produce a working implementation of just this tool
granted, it might have been bc i was testing inside the more restricted artefact sandbox
and i didn't give it much of a chance to do better, but
[gemini's approach](https://g.co/gemini/share/a5338e82ed12) worked very well.
you can still use the test example that claude produced to try it out yourself:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Random Color Generator</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            margin: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            transition: background-color 0.5s ease;
            text-align: center;
            padding: 20px;
        }
        
        .container {
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            width: 100%;
        }
        
        h1 {
            margin-top: 0;
            color: #333;
        }
        
        .color-display {
            font-size: 24px;
            font-weight: bold;
            margin: 20px 0;
            padding: 10px;
            border-radius: 4px;
            background-color: rgba(255, 255, 255, 0.5);
        }
        
        button {
            background-color: #4CAF50;
            border: none;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 10px 5px;
            cursor: pointer;
            border-radius: 4px;
            transition: background-color 0.3s;
        }
        
        button:hover {
            background-color: #45a049;
        }
        
        .color-history {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px;
            margin-top: 20px;
        }
        
        .history-item {
            width: 40px;
            height: 40px;
            border-radius: 4px;
            cursor: pointer;
            border: 1px solid rgba(0, 0, 0, 0.1);
            transition: transform 0.2s;
        }
        
        .history-item:hover {
            transform: scale(1.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Random Color Generator</h1>
        <div class="color-display" id="colorCode">#FFFFFF</div>
        <button id="generateBtn">Generate Color</button>
        <button id="copyBtn">Copy Hex Code</button>
        <div>
            <p>Recent colors:</p>
            <div class="color-history" id="colorHistory"></div>
        </div>
    </div>

    <script>
        const body = document.body;
        const colorCode = document.getElementById('colorCode');
        const generateBtn = document.getElementById('generateBtn');
        const copyBtn = document.getElementById('copyBtn');
        const colorHistory = document.getElementById('colorHistory');
        
        // Max history items to display
        const MAX_HISTORY = 10;
        
        // Array to store color history
        let history = [];
        
        // Generate a random color
        function generateRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            
            return color;
        }
        
        // Update the UI with a new color
        function updateColor(color) {
            body.style.backgroundColor = color;
            colorCode.textContent = color;
            
            // Add to history
            if (!history.includes(color)) {
                history.unshift(color);
                
                // Keep history at MAX_HISTORY items
                if (history.length > MAX_HISTORY) {
                    history.pop();
                }
                
                updateColorHistory();
            }
        }
        
        // Update the color history display
        function updateColorHistory() {
            colorHistory.innerHTML = '';
            
            history.forEach(color => {
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item';
                historyItem.style.backgroundColor = color;
                historyItem.setAttribute('title', color);
                
                historyItem.addEventListener('click', () => {
                    updateColor(color);
                });
                
                colorHistory.appendChild(historyItem);
            });
        }
        
        // Generate button click event
        generateBtn.addEventListener('click', () => {
            const newColor = generateRandomColor();
            updateColor(newColor);
        });
        
        // Copy button click event
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(colorCode.textContent)
                .then(() => {
                    // Temporarily change button text as feedback
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Copied!';
                    
                    setTimeout(() => {
                        copyBtn.textContent = originalText;
                    }, 1500);
                })
                .catch(err => {
                    console.error('Could not copy text: ', err);
                });
        });
        
        // Initialize with a random color
        updateColor(generateRandomColor());
    </script>
</body>
</html>
```


