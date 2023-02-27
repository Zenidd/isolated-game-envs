import styles from "./DeployButton.module.css"

function deploymentAlert(props){
    alert('You will deploy a new server');
}


export function DeployButton(props){
   return <button onClick={deploymentAlert} className={styles.button}>Order now {props.pricing}</button>;
}

