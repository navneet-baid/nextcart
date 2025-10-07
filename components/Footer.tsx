import styles from "@/styles/Footer.module.css";
import Link from "next/link";
import {
    Facebook,
    Instagram,
    Pinterest,
    Twitter,
} from "react-bootstrap-icons"

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerContent}>
                    <div className={styles.footerCol}>
                        <h4 className={styles.footerTitle}>About NextCart</h4>
                        <p className={styles.aboutText}>
                            NextCart is your modern online store bringing you curated fashion
                            and lifestyle products at unbeatable prices. Shop smart, shop with
                            confidence.
                        </p>
                    </div>

                    <div className={styles.footerCol}>
                        <h4 className={styles.footerTitle}>Shop</h4>
                        <ul className={styles.footerLinks}>
                            <li><Link href="/shop">Shop All</Link></li>
                            <li><Link href="/cart">Cart</Link></li>
                            <li><Link href="/about">About</Link></li>
                        </ul>
                    </div>

                    <div className={styles.footerCol}>
                        <h4 className={styles.footerTitle}>Information</h4>
                        <ul className={styles.footerLinks}>
                            <li><Link href="#">Cookies Policy</Link></li>
                            <li><Link href="#">Privacy Policy</Link></li>
                            <li><Link href="#">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    <div className={styles.footerCol}>
                        <h4 className={styles.footerTitle}>Follow Us</h4>
                        <div className={styles.socialIcons}>
                            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="#" aria-label="Pinterest"><Pinterest size={20} /></a>
                            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                        </div>
                    </div>
                </div>

                <hr className={styles.divider} />

                <div className={styles.copyright}>
                    <p>© {new Date().getFullYear()} Made by Navneet.</p>
                </div>
            </div>
        </footer>
    );
}
