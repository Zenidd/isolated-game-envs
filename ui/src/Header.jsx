import styles from "./Header.module.css"
import logo from './logo.svg';


export function Header(props){
    console.log(styles);
    return(
        <div className={styles.header}>
            <img src={logo} alt="" width={250} height={250}></img>
        </div>
    );
}
