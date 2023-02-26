import plans from "./assets/plans.json"
import { PlanCard } from "./PlanCard";
import styles from "./PlansGrid.module.css"

export function PlansGrid(){
  return ( 
    <ul className={styles.plansGrid}>
      {plans.map((plan) => (
      <PlanCard key={plan.plan_name} plan={plan}/>
    ))}
    </ul>

  );
}
