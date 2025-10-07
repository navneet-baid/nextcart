"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/Header.module.css";
import { Search, Cart, X } from "react-bootstrap-icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import NotificationBar from '@/components/NotificationBar';

export default function Header() {
    const [isClient, setIsClient] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const pathname = usePathname();
    const router = useRouter();

    const cartItems = useSelector((state: RootState) => state.cart.items);
    const cartCount = cartItems.length;

    useEffect(() => {
        setIsClient(true);
    }, []);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop" },
        { label: "About", href: "/about" },
    ];

    // Handle search submit
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
            setShowSearch(false);
            setSearchTerm("");
        }
    };

    return (
        <>
            <NotificationBar />
            <header className={`${styles.header} ${showSearch ? styles.searchActive : ""}`}>
                <div className="container">
                    <div className={styles.headerInner}>
                        <div className={styles.left}>
                            <div className={styles.logo}>
                                <Link href="/">NextCart</Link>
                            </div>
                        </div>

                        <div className={`${styles.center} ${showSearch ? styles.centerActive : ""}`}>
                            {!showSearch ? (
                                <nav className={styles.nav}>
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={`${styles.navLink} ${pathname === link.href ? "active" : ""}`}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>
                            ) : (
                                <form className={styles.searchContainer} onSubmit={handleSearchSubmit}>
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        className={styles.searchInput}
                                        autoFocus
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className={styles.iconBtn}
                                        onClick={() => setShowSearch(false)}
                                        aria-label="Close search"
                                    >
                                        <X size={22} />
                                    </button>
                                </form>
                            )}
                        </div>

                        <div className={styles.right}>
                            <button
                                className={styles.iconBtn}
                                onClick={() => setShowSearch(true)}
                                aria-label="Open search"
                            >
                                <Search size={20} />
                            </button>

                            <div className={styles.cartWrapper}>
                                <Link href="/cart" className={`position-relative ${styles.cartIcon}`} aria-label="View cart">
                                    <Cart size={22} />
                                    {isClient && cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
