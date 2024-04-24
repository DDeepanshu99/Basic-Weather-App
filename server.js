import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import cors from 'cors'; 
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/fetch-weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    console.log("Making API request to:", url);
    console.log(req.query);
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === "404") {
            console.error('City not found:', city);
            res.status(404).json({ error: "City not found" });
        } else {
            res.json(data);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: "Error fetching weather data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});