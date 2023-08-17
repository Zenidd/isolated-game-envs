//deployments.js
const express = require('express');
const crypto = require('crypto');

const dynamo = require('./dynamo.js');
const ecs    = require('./ecs')

const router = express.Router();


router.get('/getDeployments', function(req, res, next) {
    queriedDeployment = dynamo.getDeployments();
    console.log(queriedDeployment);
    const deployment_headers = req.headers;
    res.render('index', { title: 'Deployments' });
});


router.get('/getDeploymentsByDeploymentID', function(req, res, next) {
    queriedDeployment = dynamo.getDeploymentsByDeploymentID('D1');
    console.log(queriedDeployment);
    const deployment_headers = req.headers;
    res.render('index', { title: 'Hexstation API' });
  });


// POST /ecsDeployment
router.post('/ecsDeployment', async(req, res) => {
    console.log("Received Deployment request");
    const deployment_headers = req.headers;

    // Parameter validation
    if (!deployment_headers['username'] ||
        !deployment_headers['servername'] ||
        !deployment_headers['gamename'] ||
        deployment_headers['gamename'] !== 'minecraft'
    )
    {
     return res.status(400).send({ success: false, message: 'Missing required parameters.' });
    }

    const username = deployment_headers['username'];
    const servername = deployment_headers['servername'];
    const gamename = deployment_headers['gamename'];

    let task_definition_arn;
    if (gamename === 'minecraft') {
        task_definition_arn = 'arn:aws:ecs:us-west-1:320914960204:task-definition/minecraft-small:6';
    }

    const randomBytes = crypto.randomBytes(2);
    const ecsid = randomBytes.toString('hex');
    const deploymentID = username.split("@")[0] + '-' + ecsid;
    const currentDate = new Date();
    const deploymentDate = String(currentDate);
    console.log(ecsid);
    console.log(deploymentID);
    const api_clustername = 'hestation';

    const dp = {
        "DeploymentID": deploymentID,
        "taskarn": "",
        "username": username,
        "DeploymentDate": deploymentDate,
        "deleted": "False",
        "DeletionDate": "",
        "server_name": servername,
        "serverip": "",
        "game_name": gamename
    };

    // Send a 200 OK response immediately after validation and before deploying
    res.status(200).send({ success: true });
    console.log("Sent response");

    dynamo.addDeployment(dp);
    try {
        const result = await ecs.deployServiceWithTask(deploymentID, api_clustername, task_definition_arn);
        containerIP = result.ecs_taskIP; // Assign values to non-const variables
        taskARN = result.ecs_taskARN;
        if (containerIP && taskARN) {
            console.log('Container IP:', containerIP);
            console.log('Task ARN:', taskARN);
            const dp_update = {
                "DeploymentID": deploymentID,
                "taskarn": taskARN,
                "serverip": containerIP
            };
            dynamo.updateDeployment(dp_update);
        } else {
            console.log('No valid container IP or task ARN found.');
        }
    } catch (error) {
        console.error('Error in deployServiceWithTask:', error);
    }
});


// POST /ecsDeleteDeployment
router.post('/ecsDeleteDeployment', async(req, res) => {
    const api_clustername = 'hestation';

    console.log("Received Deployment deletion request");
    const deployment_headers = req.headers;
    if (!deployment_headers['deploymentid'])
    {
     return res.status(400).send({ success: false, message: 'Missing required deploymentid parameter.' });
    }
    deploymentid = deployment_headers['deploymentid'];
    const currentDate = new Date();

    res.status(200).send({ success: true });
    console.log("Sent response");


    const dp_deletion = {
        "DeploymentID" : deploymentid,
        "deleted" : "True",
        "DeletionDate" :  String(currentDate),
    }
    try {
        const result = await ecs.deleteService(api_clustername, deploymentid);
        dynamo.updateDeployment(dp_deletion);
    }
    catch (error) {
        console.error('Error in deployServiceWithTask:', error);
    }
    var body = res.body;
});

// Export the router
module.exports = router;