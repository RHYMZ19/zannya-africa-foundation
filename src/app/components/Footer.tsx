import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>

      {/* TOP LINKS */}
      <div className={styles.footerTop}>

        <a href="mailto:info@zannyaafricafoundation.org">
          📧 info@zannyaafricafoundation.org
        </a>

        <span>|</span>

        <Link href="/Terms">
          Privacy Policy & Legal Terms
        </Link>

        <span>|</span>

        <Link href="/adminpannel">
          Admin Panel
        </Link>

      </div>

      {/* BOTTOM */}
      <div className={styles.footerBottom}>

        <p>
          © {new Date().getFullYear()} Zannya Africa Foundation.
          All Rights Reserved.
        </p>

        <div className={styles.footerDeveloper}>

          <span>
            Developed by{" "}
            <strong>SSENABULYA RAHIM</strong>
          </span>

          <span>|</span>

          <a href="tel:+256743878261">
            0743878261
          </a>

          <span>|</span>

          <a href="mailto:rahimssenabulya82@gmail.com">
            rahimssenabulya82@gmail.com
          </a>

        </div>

      </div>

    </footer>
  );
}