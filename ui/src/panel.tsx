
import { Deployment } from './components/deployment/deployment';
import './panel.css'



export default function Panel() {
  return (
    <>
      <div className='panel-container'>
      <h1>Deployment panel</h1>
      </div>
      <Deployment/>
      
      <h2> The API_HOST is {import.meta.env.VITE_API_HOST} </h2>
      <h2> The API_KEY is {import.meta.env.VITE_API_KEY} </h2>
    </>
  );
}


