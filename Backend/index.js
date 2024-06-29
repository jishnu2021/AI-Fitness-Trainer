const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/run-python', (req, res) => {
  const scriptPath = path.join(__dirname, 'C:/Users/jishn/Desktop/New folder/AI-Fitness-Trainer/Backend/AI/PushUpCounter.py');
  exec(`python3 "${scriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send(error.message);
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).send(stderr);
    }
    console.log(`Stdout: ${stdout}`);
    res.send(stdout);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
