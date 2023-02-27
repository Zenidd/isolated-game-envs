import { PlansGrid } from "./PlansGrid";
import styles from "./app.module.css"
import {Header} from "./Header"

export function App(){
  return (
  <div className={styles.app}>
    <Header />

    <header> 
    <h1>Hosting plans</h1>
    </header>
  
    <main>
      <PlansGrid/>
    </main>

  </div>
  );
}
