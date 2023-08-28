//panel.tsx

import { NewDeployment } from './components/deployment/newdeployment';
import { ShowDeployments } from './components/deployment/showdeployments';
import './panel.css'

export default function Panel() {
    return (
        <>
            <div className="panel-container">
                <h1>Deployment panel</h1>
                <div className="panel-subcontainer">
                    <NewDeployment />    
                    <div className="horizontal-line"></div>
                    <ShowDeployments />
                </div>
            </div>
        </>
    );
}
