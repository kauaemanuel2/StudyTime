import styles from "./Main.module.css";
import ButtonLink from "../layout/ButtonLink";

function Main() {
    return (
        <main className={styles.hero}>
            <div className={styles.content}>
                <h1>Bem-vindo ao <span>Study Time</span></h1>
                <p className={styles.subtitle}>Transforme seu tempo de estudo em resultados extraordinários</p>
                <ButtonLink to="/formulario" text="Começar Agora" />
            </div>
        </main>
    );
}

export default Main;