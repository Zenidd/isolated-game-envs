import { useState } from "react";
import "./showdeployments.css";
import axios from 'axios';

function shortenDateTime(datetimeStr) {
    const pattern = /(\w{3} \w{3} \d{2} \d{4} \d{2}:\d{2}:\d{2})/;
    const match = datetimeStr.match(pattern);

    return match ? match[1] : "Pattern not found in the string.";
}

export function ShowDeployments(props){
    const [deployments, setDeployments] = useState([]);
    const [selectedDeploymentId, setSelectedDeploymentId] = useState(null); // New state for the selected deployment ID

    const getdeploymentsEndpoint = 'http://localhost:4000/getdeployments';

    const fetchDeployments = async () => {
        try {
            const response = await axios.get(getdeploymentsEndpoint);
            setDeployments(response.data.Items);
        } catch (error) {
            alert('Error fetching deployments. Please try again.');
        }
    };


// Function to handle delete button click
const handleDelete = () => {
    if (selectedDeploymentId) {
        alert(`Deleting deployment with ID: ${selectedDeploymentId}`);
        // Here you can add logic to make a call to your API to delete the deployment
        const deletedeploymentsEndpoint = 'http://localhost:4000/delete';

        const requestData = {
            deploymentid: selectedDeploymentId 
        };

        // Create a new async function to handle the deletion
        const deleteDeployment = async () => {
            try {
                const response = await axios.post(deletedeploymentsEndpoint, requestData);
                console.log(response.data);
                alert('Deployment deletion successful!');
            } catch (error) {
                alert('Error in deployment delete. Please try again.');
            }
            setSelectedDeploymentId(null); // Reset the selected ID after deletion
        };

        deleteDeployment(); // Invoke the async function
    } else {
        alert("Please select a deployment to delete.");
    }
};


    return (
        <>
            <div className="showdeployments-button">
                <button onClick={fetchDeployments}>show deployments</button>
            </div>
            {deployments.length > 0 && (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Game</th>
                                <th>User Name</th>
                                <th>Server Name</th>
                                <th>Server IP</th>
                                <th>Deployment ID</th>
                                <th>Deployment Date</th>
                                <th>Deleted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deployments.map((deployment, index) => (
                                <tr key={index}>
                                    <td>
                                        <input 
                                            type="radio" 
                                            name="deploymentSelect"
                                            value={deployment.DeploymentID}
                                            onChange={() => setSelectedDeploymentId(deployment.DeploymentID)}
                                        />
                                    </td>
                                    <td>{deployment.game_name}</td>
                                    <td>{deployment.username}</td>
                                    <td>{deployment.server_name}</td>
                                    <td>{deployment.serverip}</td>
                                    <td>{deployment.DeploymentID}</td>
                                    <td>{shortenDateTime(deployment.DeploymentDate)}</td>
                                    <td>{deployment.deleted}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleDelete}>Delete Selected Deployment</button>
                </div>
            )}
        </>
    );
}