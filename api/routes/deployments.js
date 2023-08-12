// routes/deply.js
const express = require('express');
const router = express.Router();

// GET /deploy
router.post('/deploy', async(req, res) => {
    console.log("Received Deployment request");
    const deployment_headers = req.headers;
    deployment_variables = `-var hcloud_token=${process.env.HCLOUD_TOKEN} `;
    if (deployment_headers['tier']) {
        const Tier = deployment_headers['tier'];
        deployment_variables += '-var server_tier=' + Tier + ' ';
      }
    
    if (deployment_headers['name']) {
        const Name = deployment_headers['name'];
        deployment_variables += '-var server_name=' + Name + ' ';
    }   

    if (deployment_headers['java_m']) {
        const java_m = deployment_headers['java_m'];
        deployment_variables += '-var java_m=' + java_m + ' ';
    }

    if (deployment_headers['location']) {
        const location_s = deployment_headers['location'];
        deployment_variables += '-var server_location=' + location_s + ' ';
    }   
    console.log('Deployment vars:',deployment_variables);
    var body = res.body;
    res.status(200).send({ success: true });
    console.log("Sent response");

    // Deploying through terraform
    const { spawn } = require("child_process");
    const terraform = spawn(`terraform -chdir=../terraform apply -lock=false -auto-approve ${deployment_variables}`, [], { shell: true });

    // Logging
    terraform.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
    });
    terraform.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });
    terraform.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });
    terraform.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });
});

// POST /deploy
router.post('/', (req, res) => {

});

// Export the router
module.exports = router;
