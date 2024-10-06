const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

let votes = [];

app.use(bodyParser.json());
app.use(cors());

app.use(express.static('public'));

app.post('/vote', (req, res) => {
    const { name, sport } = req.body;
    if (!name || !sport) {
        return res.status(400).json({ error: 'Invalid vote submission' });
    }

    const existingVote = votes.find(v => v.name === name);
    if (existingVote) {
        return res.status(400).json({ error: 'You have already voted this week' });
    }

    votes.push({ name, sport });
    
    res.json(votes);
});

const resetVotes = () => {
    const now = new Date();
    const day = now.getDay();
    if (day === 3) {
        votes = [];
    }
};

setInterval(resetVotes, 60 * 60 * 1000);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
