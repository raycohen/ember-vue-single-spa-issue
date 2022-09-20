import React from "react";
import styles from "./primary-nav.css";
import { NavLink } from "react-router-dom";

export default function PrimaryNav(props) {
  return (
    <nav className={styles.primaryNav}>
      <ul>
        <li>
          <NavLink
            to="/clients"
            className={styles.navLink}
            activeClassName={styles.activeClassName}
          >
            Client list
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/four-oh"
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
          >
            Four-oh
          </NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <a
            href="https://github.com/polyglot-microfrontends"
            className={styles.navLink}
          >
            Code / Documentation (Local React)
          </a>
        </li>
      </ul>
    </nav>
  );
}
