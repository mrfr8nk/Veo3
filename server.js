// server.js
const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const { fal } = require('@fal-ai/client');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Read API key from fal.env file
async function getFalApiKey() {
    try {
        const envContent = await fs.readFile('fal.env', 'utf8');
        const lines = envContent.split('\n');
        
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('FAL_KEY=')) {
                return trimmedLine.replace('FAL_KEY=', '').replace(/"/g, '');
            }
        }
        
        throw new Error('FAL_KEY not found in fal.env file');
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('fal.env file not found. Please create a fal.env file with FAL_KEY=your_api_key');
        }
        throw error;
    }
}

// Initialize FAL client
let falClient;
(async () => {
    try {
        const apiKey = await getFalApiKey();
        fal.config({ credentials: apiKey });
        falClient = fal;
        console.log('✅ FAL API key loaded successfully');
    } catch (error) {
        console.error('❌ Error loading FAL API key:', error.message);
        process.exit(1);
    }
})();

// API endpoint to generate video
app.post('/api/generate-video', async (req, res) => {
    try {
        if (!falClient) {
            return res.status(500).json({ error: 'FAL client not initialized' });
        }

        console.log('🎬 Starting video generation with prompt:', req.body.prompt?.substring(0, 100) + '...');
        
        const result = await falClient.subscribe("fal-ai/veo3", {
            input: req.body,
            logs: true,
            onQueueUpdate: (update) => {
                // Log status updates on server side
                console.log(`📊 Status: ${update.status}`);
                if (update.logs && update.logs.length > 0) {
                    update.logs.forEach(log => console.log(`📝 Log: ${log.message}`));
                }
            }
        });

        console.log('✅ Video generation completed');
        res.json(result);

    } catch (error) {
        console.error('❌ Video generation error:', error.message);
        res.status(500).json({ 
            error: error.message,
            details: error.response?.data || 'No additional details'
        });
    }
});

// API endpoint to check server status
app.get('/api/status', (req, res) => {
    res.json({ 
        status: 'ok', 
        falClientReady: !!falClient,
        timestamp: new Date().toISOString()
    });
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Veo 3 Video Generator running on http://localhost:${PORT}`);
    console.log('📁 Make sure your fal.env file exists in the project root');
});

module.exports = app;