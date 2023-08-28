//lambda.js

const awsServerlessExpress = require('aws-serverless-express');
const app = require('./server.cjs'); // Your main Express app file

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context);
};
