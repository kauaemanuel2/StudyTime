import { GrConfigure } from "react-icons/gr";
import { GiBookshelf } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom"

import styles from './Sidebar.module.css'

function Sidebar(){

    return(
        <div className={styles.sidebarContent}>
        <h2>Study Time</h2>
        <nav>
            <ul className={styles.list_init}>
                <li>
                    <FaHome className={styles.icon} /> <Link to = '/dashboard'>Inicio</Link>
                </li>
                <li>
                    <GiBookshelf className={styles.icon} /> <Link to = '/materias'>Minhas matérias</Link>
                </li>
            </ul>
        </nav>
        </div>
    )

}

export default Sidebar