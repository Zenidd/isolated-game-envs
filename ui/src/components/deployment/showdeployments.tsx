//showdeployments.tsx

import { useState, useContext } from "react";
import "./showdeployments.css";
import axios from 'axios';
import { UserContext } from '../../userprovider.tsx';  

interface Deployment {
    DeploymentID: string;
    game_name: string;
    username: string;
    server_name: string;
    serverip: string;
    DeploymentDate: string;
    deleted: string;
}

function shortenDateTime(datetimeStr) {
    const pattern = /(\w{3} \w{3} \d{2} \d{4} \d{2}:\d{2}:\d{2})/;
    const match = datetimeStr.match(pattern);

    return match ? match[1] : "Pattern not found in the string.";
}

export function ShowDeployments(){
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("ShowDeployments must be used within a UserProvider");
     }
     
     const { userEmail } = userContext;
     const [deployments, setDeployments] = useState<Deployment[]>([]);
     const [selectedDeploymentId, setSelectedDeploymentId] = useState<string | null>(null);
     const [hideDeleted, setHideDeleted] = useState(false);
     const toggleHideDeleted = () => {
        setHideDeleted(!hideDeleted);
    };

    const getdeploymentsEndpoint = `${import.meta.env.VITE_API_URL}/getdeploymentsbyusername`;

    const fetchDeployments = async () => {
        try {
            const headers = {
                'username': userEmail
            };
            const response = await axios.get(getdeploymentsEndpoint, { headers: headers });
            console.log(JSON.stringify(response));
            setDeployments(response.data || []);
        } catch (error) {
            alert('Error fetching deployments. Please try again.');
        }
    };
    

const handleDelete = () => {
    if (selectedDeploymentId) {
        alert(`Deleting deployment with ID: ${selectedDeploymentId}`);
        const deletedeploymentsEndpoint = `${import.meta.env.VITE_API_URL}/delete`;

        const requestData = {
            'deploymentid' : selectedDeploymentId 
        };

        const deleteDeployment = async () => {
            try {
                const response = await axios.post(deletedeploymentsEndpoint, {}, {headers : requestData});
                console.log(response.data);
                alert('Deployment deletion successful!');
            } catch (error) {
                alert('Error in deployment delete. Please try again.');
            }
            setSelectedDeploymentId(null); 
        };

        deleteDeployment(); 
    } else {
        alert("Please select a deployment to delete.");
    }
};

    const filteredDeployments = hideDeleted ? deployments.filter((deployment) => deployment.deleted !== 'True') : deployments;

    return (
        <>
          <div className="wrapper">
            <div className="showdeployments-button">
                <button onClick={fetchDeployments}>Show Deployments</button>
                <label>
                    <input 
                        type="checkbox" 
                        checked={hideDeleted} 
                        onChange={toggleHideDeleted} 
                    />
                    Hide Deleted Deployments
                </label>
            </div>
            {Array.isArray(filteredDeployments) && filteredDeployments.length > 0 && (
                <>
                  <table>
                        <thead>
                            <tr>
                                <th>Game</th>
                                <th>Server Name</th>
                                <th>Server IP</th>
                                <th>Deployment ID</th>
                                <th>Deployment Date</th>
                                <th>Deleted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDeployments.map((deployment, index) => (
                                <tr 
                                    key={index} 
                                    onClick={() => setSelectedDeploymentId(deployment.DeploymentID)}
                                    className={selectedDeploymentId === deployment.DeploymentID ? 'selected-row' : ''}
                                >
                                    <td>
                                        {deployment.game_name === 'minecraft' ? (
                                            <img src="../minecraft.png" alt="Minecraft"  width="30" height="30" />
                                        ) : (
                                            deployment.game_name
                                        )}
                                    </td>
                                    <td>{deployment.server_name}</td>
                                    <td>{deployment.serverip}</td>
                                    <td>{deployment.DeploymentID}</td>
                                    <td>{shortenDateTime(deployment.DeploymentDate)}</td>
                                    <td>{deployment.deleted.toString()}</td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
              {selectedDeploymentId && (
                <div className="delete-button">
                  <button onClick={handleDelete}>Delete Selected Deployment</button>
                </div>
              )}
            </>
        )}
      </div>
    </>
);
              }