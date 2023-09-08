
import { Deployment } from './components/deployment/deployment';
import './panel.css'



export default function Panel() {
  return (
    <>
      <div className='panel-container'>
      <h1>Deployment panel</h1>
      </div>
      <Deployment/>
    </>
  );
}


