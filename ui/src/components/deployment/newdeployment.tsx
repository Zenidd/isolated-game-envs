//newdeployment.tsx

import { useState, useContext } from "react";
import "./newdeployment.css";
import Select, { components }  from 'react-select';
import Creatable from 'react-select/creatable';
import axios from 'axios';
import { UserContext } from '../../userprovider.tsx';


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
    placeholder: (provided) => ({
        ...provided,
        color: 'black'  // Change this color as per your requirement
      }),
    control: (provided) => ({
      ...provided,
      backgroundColor: 'grey',  // Lighter grey to distinguish from page background
      color: 'black',  // Text color
      borderRadius: '4px'  // Optional, for rounded corners
    }),
    container: (provided) => ({
      ...provided,
      color: 'grey',  // Text color
      width: '300px'  // Set the width as per your requirement
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? '#8000FF' : 'black',
      backgroundColor: state.isSelected ? 'light-grey' : 'dark-grey'
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'black', // Make the text color darker when a value is selected
    })
  };



export function NewDeployment(props){
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("ShowDeployments must be used within a UserProvider");
     }

     const { userEmail } = userContext;

     const [selectedGame, setSelectedGame] = useState<{ value: string, label: string } | null>(null);
     const [selectedLocation, setSelectedLocation] = useState<{ value: string, label: string } | null>(null);
     const [selectedTier, setSelectedTier] = useState<{ value: string, label: string } | null>(null);
     const [selectedServerName, setSelectedServerName] = useState<{ value: string, label: string } | null>(null);
   
     const DropdownIndicator = () => null;

        // New state for storing the deployments

        const handleDeployment = async () => {
            if (selectedGame && selectedLocation && selectedTier && selectedServerName) {

                const deployEndpoint = `${import.meta.env.VITE_API_URL}/deploy`;
                console.log(selectedGame.value);
                console.log(userEmail);
                console.log(selectedServerName.value);               

                const headers = {
                    'gamename': selectedGame.value,
                    'username': userEmail,
                    'servername': selectedServerName.value, 
                };
    
                try {
                    const response = await axios.post(deployEndpoint, {}, { headers: headers });
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
                <Select styles={customStyles} options={d_game} value={selectedGame} onChange={setSelectedGame} placeholder="Game" />
                <Select styles={customStyles} options={d_location} value={selectedLocation} onChange={setSelectedLocation} placeholder="Region"  />
                <Select styles={customStyles} options={d_tier} value={selectedTier} onChange={setSelectedTier} placeholder="Server size" />
                <Creatable
                components={{ DropdownIndicator }}
                styles={customStyles}
                  value={selectedServerName}
                  onChange={setSelectedServerName}
                  placeholder="Server Name"
                  isClearable
                />
              </div>
              <div className="newdeployment-button">
                <button onClick={handleDeployment}>Order now {props.pricing}</button>
              </div>
            </>
          );
        }