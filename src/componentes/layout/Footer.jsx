import styles from "./Footer.module.css";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <p>© 2025 <strong>Study Time</strong> - Todos os direitos reservados</p>
            </div>
        </footer>
    );
}

export default Footer;