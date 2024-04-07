const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());

app.use(express.json());

app.get('/extract', async (req, res) => {
    const { url } = req.query;

    if (!url || !ytdl.validateURL(url)) {
        return res.status(400).json({ error: 'Please provide a valid YouTube video URL.' });
    }

    try {
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title;
        const description = info.videoDetails.description;
        const tags = info.videoDetails.keywords || [];

        res.status(200).json({ title, description, tags });
    } catch (error) {
        console.error('Error extracting video info:', error);
        res.status(500).json({ error: 'An error occurred while extracting video info.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
m