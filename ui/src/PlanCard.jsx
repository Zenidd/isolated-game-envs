import styles from "./PlanCard.module.css"
import { DeployButton } from "./DeployButton";

export function PlanCard(props){
    console.log(styles);
    const image_path = props.plan.plan_image
    return (
        <li className={styles.planCard}>
            <img src={image_path} alt={props.plan_name} className={styles.movieImage}/>
            <div>{props.plan.plan_name}</div>
            <ul className={styles.planCard_description}>
                {/* <li>Price (monthly) {props.plan.cost} </li> */}
                
                <li>RAM {props.plan.specs_ram}{"\n"} </li>

                <li>CPU {props.plan.specs_cpu} {"\n"}</li>
                <li>Mods support: {props.plan.mods} </li>
                <li> {props.plan.backups} </li>
            </ul>
            <li><DeployButton pricing={props.plan.cost} /></li>
        </li>

    );
}