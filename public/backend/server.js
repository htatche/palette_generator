const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const sharp = require('sharp');
const VSCodeThemeGenerator = require('../frontend/theme-generator/vscode-theme');
const config = require('../../config');

// Validate configuration on startup
config.validate();

const app = express();
const PORT = config.port;

// Function to extract dominant colors from image
async function extractColors(imageBuffer) {
    try {
        // Resize image to smaller size for faster processing
        const resized = await sharp(imageBuffer)
            .resize(100, 100)
            .raw()
            .toBuffer();
        
        // Get image info
        const { width, height, channels } = await sharp(imageBuffer).metadata();
        
        // Sample colors from the image
        const colors = new Map();
        const step = Math.max(1, Math.floor((width * height) / 1000)); // Sample every nth pixel
        
        for (let i = 0; i < resized.length; i += channels * step) {
            if (i + 2 < resized.length) {
                const r = resized[i];
                const g = resized[i + 1];
                const b = resized[i + 2];
                
                // Convert to hex
                const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
                
                // Count frequency
                colors.set(hex, (colors.get(hex) || 0) + 1);
            }
        }
        
        // Sort by frequency and get top colors
        const sortedColors = Array.from(colors.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8) // Get top 8 colors
            .map(([hex]) => hex);
        
        return sortedColors;
        
    } catch (error) {
        console.error('❌ Error extracting colors:', error);
        // Return some fallback colors if extraction fails
        return ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
    }
}


// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// API endpoint to generate palette
app.post('/api/generate-palette', async (req, res) => {
    console.log('🎨 Received palette generation request');
    
    const { text } = req.body; // Token is now from environment variables
    console.log('📝 Input text:', text);
    
    if (!text) {
        console.log('❌ No text provided');
        return res.status(400).json({ error: 'Text is required' });
    }
    
    // Use token from secure configuration
    const token = config.huggingFaceToken;
    
    try {
        console.log('🚀 Making API call to Hugging Face...');
        
        // Create a timeout promise
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Request timeout after 60 seconds')), 60000);
        });
        
        // Use Stable Diffusion XL model for color palette generation
        const fetchPromise = fetch('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: `color palette, ${text}, abstract colors, swatches`,
                parameters: { 
                    num_inference_steps: 20,
                    guidance_scale: 7.5,
                    width: 512,
                    height: 512
                },
                options: {
                    use_cache: false,
                    wait_for_model: true
                }
            })
        });
        
        // Race between fetch and timeout
        const response = await Promise.race([fetchPromise, timeoutPromise]);
        
        console.log('📡 API response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ API error response:', errorText);
            
            
            return res.status(response.status).json({ error: `API request failed: ${errorText}` });
        }
        
        const imageBuffer = await response.buffer();
        console.log('✅ API call successful, received image buffer');
        
        // Extract colors from the image
        console.log('🎨 Extracting colors from palette image...');
        const colors = await extractColors(imageBuffer);
        console.log('✅ Extracted colors:', colors);
        
        // Convert buffer to base64 for sending to frontend
        const base64Image = imageBuffer.toString('base64');
        const imageBlob = `data:image/png;base64,${base64Image}`;
        
        // Return both the image and colors
        res.json({ 
            colors: colors,
            imageBlob: imageBlob
        });
        
    } catch (error) {
        console.error('❌ Error generating palette:', error);
        if (error.message.includes('timeout')) {
            res.status(408).json({ error: 'Request timeout - the model is taking too long to respond. Please try again.' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

// API endpoint to generate VS Code theme
app.post('/api/generate-theme', async (req, res) => {
    console.log('🎨 Received theme generation request');
    
    const { colors, themeName } = req.body;
    console.log('🎨 Colors:', colors);
    console.log('🎨 Theme name:', themeName);
    
    if (!colors || !Array.isArray(colors)) {
        console.log('❌ No colors provided');
        return res.status(400).json({ error: 'Colors array is required' });
    }
    
    try {
        const themeGenerator = new VSCodeThemeGenerator();
        const theme = themeGenerator.generateTheme(colors, themeName);
        
        console.log('✅ Theme generated successfully');
        res.json({ theme: theme });
        
    } catch (error) {
        console.error('❌ Error generating theme:', error);
        res.status(500).json({ error: error.message });
    }
});

// API endpoint to download VS Code theme package
app.post('/api/download-theme', async (req, res) => {
    console.log('📦 Received theme download request');
    
    const { colors, themeName } = req.body;
    console.log('🎨 Colors:', colors);
    console.log('🎨 Theme name:', themeName);
    
    if (!colors || !Array.isArray(colors)) {
        return res.status(400).json({ error: 'Colors array is required' });
    }
    
    try {
        const themeGenerator = new VSCodeThemeGenerator();
        const theme = themeGenerator.generateTheme(colors, themeName);
        const packagePath = await themeGenerator.createThemePackage(theme, themeName, colors);
        
        console.log('✅ Theme package created, sending download...');
        
        res.download(packagePath, `${themeName.toLowerCase().replace(/\s+/g, '-')}.vsix`, (err) => {
            if (err) {
                console.error('❌ Download error:', err);
            } else {
                console.log('✅ Theme downloaded successfully');
                // Cleanup temp files
                themeGenerator.cleanup(path.dirname(packagePath));
            }
        });
        
    } catch (error) {
        console.error('❌ Error creating theme package:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log('🎨 Color Palette Generator ready!');
});