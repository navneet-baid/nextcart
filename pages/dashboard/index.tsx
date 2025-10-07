"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchProducts } from "@/redux/productsSlice";
import styles from "@/styles/Dashboard.module.css";
import DashboardCard from "@/components/DashboardCard";
import { BoxSeam, Cart3, CurrencyDollar } from "react-bootstrap-icons";

type SortColumn = "name" | "price" | null;
type SortOrder = "asc" | "desc";

export default function Dashboard() {
    const [mounted, setMounted] = useState(false);
    const [sortColumn, setSortColumn] = useState<SortColumn>("price");
    const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.products.allItems);
    const cartItems = useSelector((state: RootState) => state.cart.items);

    useEffect(() => {
        setMounted(true);
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    if (!mounted) return null;

    const totalProducts = products.length;
    const totalCartItems = cartItems.length;
    const totalCartValue = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSort = (column: SortColumn) => {
        if (sortColumn === column) {
            // Toggle sort order
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }
    };

    const sortedProducts = [...products].sort((a, b) => {
        if (!sortColumn) return 0;

        if (sortColumn === "name") {
            if (a.title < b.title) return sortOrder === "asc" ? -1 : 1;
            if (a.title > b.title) return sortOrder === "asc" ? 1 : -1;
            return 0;
        } else if (sortColumn === "price") {
            return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
        }
        return 0;
    });

    return (
        <div className={styles.dashboardContainer}>
            <aside className={styles.sidebar}>
                <h2 className={styles.sidebarLogo}>NextCart Admin</h2>
                <ul className={styles.menu}>
                    <li className={styles.menuItem}>Dashboard</li>
                    <li className={styles.menuItem}>Products</li>
                    <li className={styles.menuItem}>Cart</li>
                </ul>
            </aside>

            <main className={styles.main}>
                <h1 className={styles.title}>Dashboard</h1>
                <div className={styles.cards}>
                    <DashboardCard title="Total Products" value={totalProducts} IconComponent={BoxSeam} />
                    <DashboardCard title="Total Items in Cart" value={totalCartItems} IconComponent={Cart3} />
                    <DashboardCard title="Total Cart Value" value={`$${totalCartValue.toFixed(2)}`} IconComponent={CurrencyDollar} />
                </div>
                <div className={styles.tableWrapper}>
                    <h3 className={styles.tableTitle}>Products List (Sortable)</h3>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th
                                    onClick={() => handleSort("name")}
                                    style={{ cursor: "pointer" }}
                                >
                                    Name {sortColumn === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                </th>
                                <th
                                    onClick={() => handleSort("price")}
                                    style={{ cursor: "pointer" }}
                                >
                                    Price ($) {sortColumn === "price" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedProducts.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.title}</td>
                                    <td>{p.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <footer className={styles.footer}>
                    &copy; {new Date().getFullYear()} Made by Navneet
                </footer>
            </main>
        </div>
    );
}
