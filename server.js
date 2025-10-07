const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ status: 'Server is running' });
});

app.post('/start-long-operation', async (req, res) => {
    const { clientId, delaySeconds } = req.body;
    
    console.log(`Operation started for ${clientId}, delay ${delaySeconds}s`);
    
    res.json({ 
        status: 'accepted',
        operationId: Date.now(),
        willCompleteIn: delaySeconds
    });
    
    setTimeout(async () => {
        try {
            console.log(`Operation completed for ${clientId}`);
        } catch (error) {
            console.error('Error sending result:', error.message);
        }
    }, delaySeconds * 1000);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});