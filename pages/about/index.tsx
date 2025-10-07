import Head from "next/head";
import styles from "@/styles/About.module.css";
import Link from "next/link";
export default function About() {
    return (
        <>
            <Head>
                <title>NextCart | About Us</title>
            </Head>

            <section className={styles.heroSection}>
                <div className="container h-100 d-flex flex-column justify-content-center align-items-center">
                    <h1 className={styles.title}>About Us</h1>
                    <nav aria-label="breadcrumb">
                        <ol className={`breadcrumb ${styles.breadcrumb}`}>
                            <li className="breadcrumb-item">
                                <Link href="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                About Us
                            </li>
                        </ol>
                    </nav>
                </div>
            </section>

            <section className="container">
                <div className={styles.content}>
                    <p>
                        This project is developed by <strong>Navneet Baid</strong> for the Next.js Project Submission at <strong>Kulsys Technologies</strong> Practical Test using Redux, TypeScript, and other modern web technologies.
                    </p>
                </div>
            </section>
        </>
    );
}
