import Head from "next/head";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchProducts, setCategory, setRating, setSort, setSearch } from "@/redux/productsSlice";
import ProductCard from "@/components/ProductCard";
import styles from "@/styles/Shop.module.css";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Shop() {
    const dispatch = useDispatch<AppDispatch>();
    const { filteredItems, loading, categories, filters } = useSelector((state: RootState) => state.products);
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search") || "";

    useEffect(() => {
        if (!categories.length) dispatch(fetchProducts());
    }, [dispatch, categories.length]);

    useEffect(() => {
        dispatch(setSearch(searchQuery));
    }, [dispatch, searchQuery]);

    return (
        <>
            <Head>
                <title>NextCart | Shop All</title>
            </Head>

            <section className={styles.heroSection}>
                <div className="container h-100 d-flex flex-column justify-content-center align-items-center">
                    <h1 className={styles.title}>{searchQuery ? `Showing results for ${"'" + searchQuery + "'"}` : "Shop All"}</h1>
                    <nav aria-label="breadcrumb">
                        <ol className={`breadcrumb ${styles.breadcrumb}`}>
                            <li className="breadcrumb-item">
                                <Link href="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                {searchQuery ? `Shop` : "Shop All"}
                            </li>
                        </ol>
                    </nav>
                </div>
            </section>

            <section className="container">
                <div className="row">
                    {filteredItems.length > 0 && (
                        <div className="col-lg-3 mb-4">
                            <div className={styles.filterCard}>
                                <h5 className="mb-3">Filters</h5>
                                <div className="mb-3">
                                    <label className="form-label">Category</label>
                                    <select
                                        className="form-select"
                                        value={filters.category}
                                        onChange={(e) => dispatch(setCategory(e.target.value))}
                                    >
                                        <option value="">All</option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Rating</label>
                                    <select
                                        className="form-select"
                                        value={filters.rating}
                                        onChange={(e) => dispatch(setRating(Number(e.target.value)))}
                                    >
                                        <option value={0}>All</option>
                                        <option value={1}>1 Star & Up</option>
                                        <option value={2}>2 Stars & Up</option>
                                        <option value={3}>3 Stars & Up</option>
                                        <option value={4}>4 Stars & Up</option>
                                        <option value={5}>5 Stars</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Sort By</label>
                                    <select
                                        className="form-select"
                                        value={filters.sort}
                                        onChange={(e) => dispatch(setSort(e.target.value))}
                                    >
                                        <option value="">Default</option>
                                        <option value="price-asc">Price Low to High</option>
                                        <option value="price-desc">Price High to Low</option>
                                        <option value="rating">Rating</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={filteredItems.length > 0 ? "col-lg-9" : "col-12"}>
                        {loading ? (
                            <p>Loading...</p>
                        ) : filteredItems.length ? (
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 g-4">
                                {filteredItems.map((product) => (
                                    <div className="col" key={product.id}>
                                        <ProductCard
                                            id={product.id}
                                            category={product.category}
                                            image={product.image}
                                            name={product.title}
                                            rating={product.rating.rate}
                                            price={`$${product.price}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="fs-3 text-center">No products found.</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
