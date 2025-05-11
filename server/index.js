const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an expert frontend engineer.' },
        { role: 'user', content: `Create a simple HTML layout using Tailwind CSS for: ${prompt}` }
      ]
    });
    const html = completion.data.choices[0].message.content;
    res.send({ html });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));