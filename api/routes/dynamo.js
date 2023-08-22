const AWS = require('aws-sdk');
require('dotenv').config({path: './.env.local'});

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME="Deployments";
const USERS_INDEX="users-index";


const getDeployments = async () => {
    const params = {
        TableName: TABLE_NAME
    };
    
    const db_response = await dynamoClient.scan(params).promise();

    if (db_response.Items) {
        db_response.Items.sort((a, b) => {
            const dateA = new Date(a.DeploymentDate);
            const dateB = new Date(b.DeploymentDate);
            return dateB - dateA; // Sort in descending order
        });
    }
    
    console.log(db_response);
    return db_response;
}



const getDeploymentsByUsername = async function(username) {
    const params = {
        TableName: TABLE_NAME, // Replace with your actual table name
        IndexName: USERS_INDEX,
        KeyConditionExpression: "username = :u",
        ExpressionAttributeValues: {
            ":u": username
        }
    };

    try {
        const result = await dynamoClient.query(params).promise();
        console.log(result);
        return result.Items;
    } catch (error) {
        console.error("Error querying deployments by username:", error);
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
  getDeploymentsByUsername,
  addDeployment,
  updateDeployment,
  deleteDeployment
};