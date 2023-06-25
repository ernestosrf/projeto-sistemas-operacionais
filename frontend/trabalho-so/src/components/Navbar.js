import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
            Process <span>Scheduling</span>
        </NavLink>
        <ul className={styles.links_list}>
            <li>
                <NavLink to="/" className={styles.active}>Home</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar