"use client";

import Link from "next/link";
import styles from "./LeadershipDropdown.module.css";

export default function LeadershipDropdown() {
  return (
    <div className={styles.dropdown}>
      <span className={styles.dropdownTitle}>Leadership ▾</span>

      <div className={styles.dropdownMenu}>
        <Link
          href="/Missions?section=Board"
          className={styles.dropdownItem}
        >
          Board Members
        </Link>

        <Link
          href="/Missions?section=Executive"
          className={styles.dropdownItem}
        >
          Executive Director
        </Link>

        <Link
          href="/Missions?section=Management"
          className={styles.dropdownItem}
        >
          Management Team
        </Link>

        <Link
          href="/Missions?section=Officers"
          className={styles.dropdownItem}
        >
          Project Officers
        </Link>

        <Link
          href="/Missions?section=Intern"
          className={styles.dropdownItem}
        >
          Intern
        </Link>
      </div>
    </div>
  );
}