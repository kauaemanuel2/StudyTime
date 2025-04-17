import styles from "./ButtonLink.module.css"

import { Link } from "react-router-dom"

function ButtonLink({text, to}){

    return(
        <Link className={styles.button} to = {to}>
            {text}
        </Link>
    )

}

export default ButtonLink