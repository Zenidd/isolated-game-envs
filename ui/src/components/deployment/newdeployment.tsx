import { useState } from "react";
import "./newdeployment.css"; // Import the CSS file
import Select from 'react-select';
import axios from 'axios'; // Make sure you have axios installed

const d_game = [
  { value: 'minecraft', label: 'Minecraft' }
];

const d_location = [
  { value: 'fsn1', label: 'Falkestein, DE' },
  { value: 'nbg1', label: 'Nuremberg, FR' }
];

const d_tier = [
  { value: 'cpx21', label: '3vCPUs - 4GB RAM - 10 slots' },
  { value: 'cpx31', label: '4vCPUs - 8GB RAM - 20 slots' },
  { value: 'cpx41', label: '8vCPUs - 16GB RAM - 50 slots' }
];

const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? '#8000FF' : 'white',
      backgroundColor: state.Selected ? 'black' : "grey",
    })
};


function shortenDateTime(datetimeStr) {
    const pattern = /(\w{3} \w{3} \d{2} \d{4} \d{2}:\d{2}:\d{2})/;
    const match = datetimeStr.match(pattern);

    return match ? match[1] : "Pattern not found in the string.";
  }

export function NewDeployment(props){
    const [selectedGame, setSelectedGame] = useState<{ value: string, label: string } | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<{ value: string, label: string } | null>(null);
    const [selectedTier, setSelectedTier] = useState<{ value: string, label: string } | null>(null);
    const [serverName, setServerName] = useState<string>("");

        // New state for storing the deployments
        const [deployments, setDeployments] = useState([]);

        const getdeploymentsEndpoint = 'http://localhost:4000/getdeployments';

        const handleDeployment = async () => {
            if (selectedGame && selectedLocation && selectedTier && serverName) {
                const deployEndpoint = 'http://localhost:4000/deploy';
    
                const requestData = {
                    gamename: selectedGame.value,
                    username: props.user,
                    servername: serverName,
                };
    
                try {
                    const response = await axios.post(deployEndpoint, requestData);
                    console.log(response.data);
                    alert('Deployment successful!');
                } catch (error) {
                    alert('Error in deployment. Please try again.');
                }
            } else {
                alert('Please fill all fields.');
            }
        };
    
        return (
            <>
                <div className="newdeployment-dropdown">
                    <Select styles={customStyles} options={d_game} value={selectedGame} onChange={setSelectedGame} />
                    <Select styles={customStyles} options={d_location} value={selectedLocation} onChange={setSelectedLocation} />
                    <Select styles={customStyles} options={d_tier} value={selectedTier} onChange={setSelectedTier}/>
                    <input type="text" placeholder="Server Name" value={serverName} onChange={e => setServerName(e.target.value)} />
                </div>
                <div className="newdeployment-button">
                    <button onClick={handleDeployment}>Order now {props.pricing}</button>
                </div>

            </>
        );
    }