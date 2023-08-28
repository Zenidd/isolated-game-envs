// server.cjs
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());



const corsOptions = {
  origin: '*',  // for development; specify the origin in production
  allowedHeaders: ['Content-Type', 'x-api-key', 'username', 'gamename', 'servername', 'deploymentid'],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
};

app.use(cors(corsOptions));


app.get('/getdeployments', async (req, res) => {
  const apiUrl = `${process.env.API_URL}/getDeployments`;

  const headers = {
      'x-api-key': `${process.env.API_TOKEN}`
  };

  try {
      const response = await axios.get(apiUrl, { headers: headers });  // Changed this line from axios.post to axios.get
      console.log("GET DEPLOYMENTS OUTPUT");
      console.log(response.data);
      res.json(response.data);
  } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error fetching deployments. Please try again.' });
  }
});



app.get('/getdeploymentsbyusername', async (req, res) => {
  const apiUrl = `${process.env.API_URL}/getDeploymentsByUsername`;

  const username = req.headers.username;  // Fixed this line
  const headers = {
    'username': username,
    'x-api-key': `${process.env.API_TOKEN}`
  };

  try {
      const response = await axios.get(apiUrl, { headers: headers });  // Changed this line from axios.post to axios.get
      // console.log(response.data);
      res.json(response.data);
  } catch (error) {
      res.status(500).json({ error: 'Error fetching deployments. Please try again.' });
  }
});

app.post('/deploy', async (req, res) => {
  const apiUrl = `${process.env.API_URL}/ecsDeployment`;
  const username = req.headers.username; 
  const gamename = req.headers.gamename; 
  const servername = req.headers.servername; 

  const headers = {
      'gamename': gamename,
      'username': username,
      'servername': servername,
      'x-api-key': `${process.env.API_TOKEN}`
    };

    try {
      const response = await axios.post(apiUrl, {}, { headers: headers });
      res.json(response.data);
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      const additionalInfo = JSON.stringify(error.response?.data) || error.message;
      res.status(500).json({ error: `Error in deployment. Additional info: ${additionalInfo}` });
    }
  
    
});


app.post('/delete', async (req, res) => {
  const deploymentid = req.headers.deploymentid; 
  const apiUrl = `${process.env.API_URL}/ecsDeleteDeployment`;
  
  const headers = {
      'deploymentid': deploymentid,
      'x-api-key': `${process.env.API_TOKEN}`
    };

    try {
      const response = await axios.post(apiUrl, {}, { headers: headers });
      res.json(response.data);
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      const additionalInfo = JSON.stringify(error.response?.data) || error.message;
      res.status(500).json({ error: `Error in deployment deletion. Additional info: ${additionalInfo}` });
    }
    
});



const PORT = 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started on port ${PORT}`);
});


module.exports = app;
