// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());


app.get('/getdeployments', async (req, res) => {
  const apiUrl = `${process.env.API_URL}:${process.env.API_PORT}/deployments/getDeployments`;

  const headers = {
      'Authorization': `Basic ${Buffer.from(`${process.env.API_ADMIN_USER}:${process.env.API_ADMIN_PWD}`).toString('base64')}` // Basic Auth
  };

  try {
      const response = await axios.get(apiUrl, { headers: headers });  // Changed this line from axios.post to axios.get
      console.log("GET DEPLOYMENTS OUTPUT");
      console.log(response.data);
      res.json(response.data);
  } catch (error) {
      res.status(500).json({ error: 'Error fetching deployments. Please try again.' });
  }
});



app.get('/getdeploymentsbyusername', async (req, res) => {
  const apiUrl = `${process.env.API_URL}:${process.env.API_PORT}/deployments/getDeploymentsByUsername`;

  const username = req.headers.username;  // Fixed this line
  const headers = {
    'username': username,
      'Authorization': `Basic ${Buffer.from(`${process.env.API_ADMIN_USER}:${process.env.API_ADMIN_PWD}`).toString('base64')}` // Basic Auth
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
  const { gamename, username, servername } = req.body;
  const apiUrl = `${process.env.API_URL}:${process.env.API_PORT}/deployments/ecsDeployment`;
  
  const headers = {
      'gamename': gamename,
      'username': username,
      'servername': servername,
      'Authorization': `Basic ${Buffer.from(`${process.env.API_ADMIN_USER}:${process.env.API_ADMIN_PWD}`).toString('base64')}` // Basic Auth
  };

  try {
      const response = await axios.post(apiUrl, {}, { headers: headers });
      res.json(response.data);
  } catch (error) {
      res.status(500).json({ error: 'Error in deployment. Please try again.' });
  }
});


app.post('/delete', async (req, res) => {
  const { deploymentid } = req.body;
  const apiUrl = `${process.env.API_URL}:${process.env.API_PORT}/deployments/ecsDeleteDeployment`;
  
  const headers = {
      'deploymentid': deploymentid,
      'Authorization': `Basic ${Buffer.from(`${process.env.API_ADMIN_USER}:${process.env.API_ADMIN_PWD}`).toString('base64')}` // Basic Auth
  };

  try {
      const response = await axios.post(apiUrl, {}, { headers: headers });
      res.json(response.data);
  } catch (error) {
      res.status(500).json({ error: 'Error in deployment deletion. Please try again.' });
  }
});



const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
