"use client";

import Link from "next/link";
import styles from "./LeadershipDropdown.module.css";

export default function LeadershipDropdown() {
  return (
    <div className={styles.dropdown}>
      <span className={styles.dropdownTitle}>Leadership ▾</span>

      <div className={styles.dropdownMenu}>
        <Link
          href="/Missionsdropdown?section=Board"
          className={styles.dropdownItem}
        >
          Board Members
        </Link>

        <Link
          href="/Missionsdropdown?section=Executive"
          className={styles.dropdownItem}
        >
          Executive Director
        </Link>

        <Link
          href="/Missionsdropdown?section=Management"
          className={styles.dropdownItem}
        >
          Management Team
        </Link>

        <Link
          href="/Missionsdropdown?section=Officers"
          className={styles.dropdownItem}
        >
          Project Officers
        </Link>

        <Link
          href="/Missionsdropdown?section=Intern"
          className={styles.dropdownItem}
        >
          Intern
        </Link>
      </div>
    </div>
  );
}