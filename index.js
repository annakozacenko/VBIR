const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/submit-to-notion', async (req, res) => {
    try {
        const { name, task } = req.body;
        const notionDatabaseId = 'e9a0e27389c94b92b556c790bc11142e';
        const integrationToken = 'secret_oZWrGAN2SSR1C5mZHWCSPgq0nx24kWNT9tIX92dKPCO';

        const url = `https://api.notion.com/v1/pages`;

        const data = {
            parent: { database_id: notionDatabaseId },
            properties: {
                Name: { title: [{ text: { content: name } }] },
                Task: { rich_text: [{ text: { content: task } }] }
            }
        };

        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${integrationToken}`,
                'Notion-Version': '2021-08-16'
            },
            body: JSON.stringify(data)
        });

        if (result.status !== 200) {
            const error = await result.json();
            console.error('Got error saving data', error);
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json({ message: 'Data saved to Notion!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
