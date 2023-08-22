
import { NewDeployment } from './components/deployment/newdeployment';
import { ShowDeployments } from './components/deployment/showdeployments';
import './panel.css'

export default function Panel(props) {
  return (
    <>
      <div className='panel-container'>
      <h1>Deployment panel</h1>
      </div>
      <NewDeployment user={props.user}/>
      <ShowDeployments user={props.user}/>
    </>
  );
}



