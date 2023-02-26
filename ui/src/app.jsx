import { PlansGrid } from "./PlansGrid";
import styles from "./app.module.css"

export function App(){
  return (
  <div className={styles.app}>
    <header> 
    <h1>Hosting plans</h1>
    </header>
    <main>
      <PlansGrid/>
    </main>

  </div>
  );
}
