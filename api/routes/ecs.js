const AWS = require('aws-sdk');
require('dotenv').config({ path: './.env.local' });

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const ecs = new AWS.ECS();
const ec2 = new AWS.EC2();

async function deployServiceWithTask(service_name, cluster_name, task_definition) {
  try {
    const clusterName = cluster_name;
    const serviceName = service_name;
    const taskDefinition = task_definition;
    const desiredCount = 1;
    ecs_taskARN = '';
    ecs_taskIP = '' ;

    // Create the ECS service
    const createServiceParams = {
      cluster: clusterName,
      serviceName: serviceName,
      taskDefinition: taskDefinition,
      desiredCount: desiredCount,
      launchType: 'FARGATE', // or 'FARGATE' if using Fargate
      networkConfiguration: {
        awsvpcConfiguration: {
          subnets: ['subnet-27aa1041'], // Replace with your subnet IDs
          securityGroups: ['sg-27062451'], // Replace with your security group IDs
          assignPublicIp: 'ENABLED', // Add this line to enable public IP assignment

        },
      },
    };

    //Create service and task
    const createServiceResponse = await ecs.createService(createServiceParams).promise();
    console.log('Service created:', createServiceResponse);

    // Wait for the service to stabilize
    console.log('Waiting for service to stabilize');
    await ecs.waitFor('servicesStable', { services: [serviceName], cluster: clusterName }).promise();
    console.log('Service has stabilized.');

    const listTasksParams = {
      cluster: clusterName,
      serviceName: serviceName,
    };
  
    const listTasksResponse = await ecs.listTasks(listTasksParams).promise();

    console.log(listTasksResponse.taskArns[0])

    if (listTasksResponse.taskArns[0].length > 0) {
      const taskARN = listTasksResponse.taskArns[0];
        ecs_taskARN = taskARN;

      console.log('Waiting for container to start running');
      await ecs.waitFor('tasksRunning', {tasks: [taskARN], cluster: clusterName }).promise();
      console.log('Container is running');
    

      const describeTasksParams = {
        cluster: clusterName,
        tasks: [taskARN],
      };

      const describeTasksResponse = await ecs.describeTasks(describeTasksParams).promise();
      console.log(describeTasksResponse.tasks[0].attachments[0].details[1].value)
 
      if (describeTasksResponse.tasks[0].attachments[0].details[1].value.length > 0) {

          const eni = describeTasksResponse.tasks[0].attachments[0].details[1].value;
          const ec2TasksParams = {
            NetworkInterfaceIds: [eni]
          };

          const describeEC2Response = await ec2.describeNetworkInterfaces(ec2TasksParams).promise();
          console.log(describeEC2Response.NetworkInterfaces[0].Association.PublicIp)
          if(describeEC2Response.NetworkInterfaces[0].Association.PublicIp.length > 0){
            
            ecs_taskIP = describeEC2Response.NetworkInterfaces[0].Association.PublicIp;
          }
          else{
            console.log('No IP found');
          }
      }
      else{
        console.log('No network interface found for the Task');
      }
    }
    else {
      console.log('No tasks found for the service.');
    }
  }
  catch (error) {
    console.error('An error occurred:', error);
  }
  return { ecs_taskARN, ecs_taskIP };
}




async function deleteService(clusterName, serviceName) {
  try {
    const deleteServiceParams = {
      cluster: clusterName,
      service: serviceName,
      force: true,
    };

    const deleteServiceResponse = await ecs.deleteService(deleteServiceParams).promise();
    console.log('Service deleted:', deleteServiceResponse);
  }
  catch (error) {
    console.error('An error occurred while deleting the service:', error);
  }
}

module.exports = {
  deployServiceWithTask,
  deleteService
};
