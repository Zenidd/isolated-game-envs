import React, { useState } from "react";
import "./deployment.css"; // Import the CSS file
import Select from 'react-select';

const d_game = [
  { value: 'vallheim', label: 'Vallheim' },
  { value: 'minecraft', label: 'Minecraft' }
];

const d_location = [
  { value: 'fsn1', label: 'Falkestein, DE' },
  { value: 'nbg1', label: 'Nuremberg, FR' }
];

const d_tier  = [
  { value: 'cpx21', label: '3vCPUs - 4GB RAM - 10 slots' },
  { value: 'cpx31', label: '4vCPUs - 8GB RAM - 20 slots' },
  { value: 'cpx41', label: '8vCPUs - 16GB RAM - 50 slots' }
];

const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? '#8000FF' : 'white',
      backgroundColor: state.Selected ? 'black' : "grey",

      // rest of styling
    })
  }

export function Deployment(props){
    const [selectedGame, setSelectedGame] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedTier, setSelectedTier] = useState(null);


    const deploymentAlert = () => {
        if (selectedGame && selectedLocation && selectedTier) {
          alert(`You will deploy a new server with:\n
            Game: ${selectedGame.label}\n
            Location: ${selectedLocation.label}\n
            Tier: ${selectedTier.label}\n`);
        } else {
          alert('Please select a value for each dropdown.');
        }
      };
    


  return (
    <>
    <div className="deployment-dropdown">
        <Select styles={customStyles} options={d_game} value={selectedGame}  onChange={setSelectedGame} />
        <Select styles={customStyles} options={d_location} value={selectedLocation} onChange={setSelectedLocation} />
        <Select styles={customStyles}  options={d_tier} value={selectedTier} onChange={setSelectedTier}/>

    </div>
    <div className="deployment-button">
    <button onClick={deploymentAlert}>Order now {props.pricing}</button>
    </div>
    </>
  );
}
