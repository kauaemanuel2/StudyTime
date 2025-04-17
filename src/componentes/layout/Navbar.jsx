import styles from "./Navbar.module.css";
import logo from "../../img/logo.png";

function Navbar() {
    return (
        <header className={styles.navbar}>
            <div className={styles.container}>
                <img src={logo} alt="Study Time" className={styles.logo} />
                <p className={styles.tagline}>Porque cada minuto de estudo vale ouro</p>
            </div>
        </header>
    );
}

export default Navbar;