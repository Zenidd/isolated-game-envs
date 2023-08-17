const AWS = require('aws-sdk');
require('dotenv').config({path: './.env.local'});

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME="Deployments";

const getDeployments = async () => {
    const params = {
        TableName: TABLE_NAME
    };
    const db_response = await dynamoClient.scan(params).promise();
    console.log(db_response)
    return db_response;
}

const getDeploymentsByDeploymentID = async (deploymentID) => {
  const params = {
      TableName: TABLE_NAME,
      Key: {
          DeploymentID: deploymentID
      }
  };

  try {
      const db_response = await dynamoClient.get(params).promise();
      console.log(db_response);
      return db_response.Item; // Assuming you want to return the queried item
  } catch (error) {
      console.error("Error fetching deployment by DeploymentID:", error);
      throw error;
  }
};



const deleteDeployment = async (DeploymentID) => {
  const params = {
      TableName: TABLE_NAME,
      Key: {
        DeploymentID
      }
  };
  const db_response = await dynamoClient.delete(params).promise();
  console.log(db_response)
  return db_response;
}


async function addDeployment(dp){
    const params = {
      TableName: TABLE_NAME,
      Item: dp
  };
  return await dynamoClient.put(params).promise();
}

async function updateDeployment(dp) {
  const expressionAttributeNames = {};
  const expressionAttributeValues = {};
  let updateExpression = 'SET';

  const keys = Object.keys(dp).filter(key => key !== 'DeploymentID');  // Exclude the DeploymentID from updates
  keys.forEach((key, index) => {
      expressionAttributeNames[`#${key}`] = key;
      expressionAttributeValues[`:${key}`] = dp[key];

      if (index !== 0) {
          updateExpression += ',';
      }
      updateExpression += ` #${key} = :${key}`;
  });

  const params = {
      TableName: TABLE_NAME,
      Key: {
          "DeploymentID": dp.DeploymentID
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues
  };

  return await dynamoClient.update(params).promise();
}

module.exports = {
  getDeployments,
  getDeploymentsByDeploymentID,
  addDeployment,
  updateDeployment,
  deleteDeployment
};