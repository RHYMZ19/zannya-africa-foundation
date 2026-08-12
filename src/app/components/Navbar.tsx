"use client";

import { useState } from "react";
import Link from "next/link";
import IncreaseImages from "./IncreaseImages";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.navbar}>

      {/* LOGO */}
      <Link href="/" className={styles.logoArea}>
        <IncreaseImages
          src="/log.jpg"
          alt="Zannya Africa Foundation Logo"
        />

        <span className={styles.logo}>
          Zannya Africa Foundation
        </span>
      </Link>

      {/* NAVIGATION */}
      <div
        className={`${styles.navLinks} ${
          open ? styles.active : ""
        }`}
      >

        {/* HOME */}
        <div className={styles.dropdown}>
          <span className={styles.dropdownTitle}>
            Home ▾
          </span>

          <div className={styles.dropdownMenu}>
            <Link
              href="/"
              className={styles.dropdownItem}
              onClick={() => setOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/Missions"
              className={styles.dropdownItem}
              onClick={() => setOpen(false)}
            >
              About Us
            </Link>
          </div>
        </div>

        {/* RESOURCES */}
        <div className={styles.dropdown}>
          <span className={styles.dropdownTitle}>
            Resources ▾
          </span>

          <div className={styles.dropdownMenu}>

            <Link
              href="/news"
              className={styles.dropdownItem}
              onClick={() => setOpen(false)}
            >
              📰 News & Updates
            </Link>

            <Link
              href="/weekly-newsletter"
              className={styles.dropdownItem}
              onClick={() => setOpen(false)}
            >
              📰 Articles
            </Link>

            <Link
              href="/Resources"
              className={styles.dropdownItem}
              onClick={() => setOpen(false)}
            >
              📄 Publications
            </Link>

          </div>
        </div>

        {/* PROGRAMS */}
        <div className={styles.dropdown}>
          <span className={styles.dropdownTitle}>
            Programs ▾
          </span>

          <div className={styles.dropdownMenu}>

            <Link
              href="/Programs/climate-justice"
              className={styles.dropdownItem}
              onClick={() => setOpen(false)}
            >
              🌱 Climate Justice
            </Link>

            <Link
              href="/Programs/reproductive-health"
              className={styles.dropdownItem}
              onClick={() => setOpen(false)}
            >
              ❤️ Reproductive Health
            </Link>

            <Link
              href="/Programs/skilling-livelihood"
              className={styles.dropdownItem}
              onClick={() => setOpen(false)}
            >
              💼 Skilling & Livelihood
            </Link>

          </div>
        </div>

        {/* GALLERY */}
        <Link
          href="/Videos"
          onClick={() => setOpen(false)}
        >
          Gallery
        </Link>

        {/* DONATE */}
        <Link
          href="/Donates"
          className={styles.btnPrimary}
          onClick={() => setOpen(false)}
        >
          Donate
        </Link>

      </div>

      {/* MOBILE MENU */}
      <button
        type="button"
        className={styles.hamburger}
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>

    </nav>
  );
}