import Head from "next/head";
import styles from "@/styles/Home.module.css";
import ProductCard from "@/components/ProductCard";
import { GetServerSideProps } from "next";
import { fetchProducts, Product } from "@/redux/productsSlice";
import { store } from "@/redux/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import Link from "next/link";

interface HomeProps {
  products: Product[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  await store.dispatch(fetchProducts());
  const products = store.getState().products.allItems;

  return { props: { products } };
};

export default function Home({ products }: HomeProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    dispatch({
      type: "products/fetchProducts/fulfilled",
      payload: products,
    });
    setHydrated(true);
  }, [dispatch, products]);

  const displayItems = hydrated ? undefined : products;

  return (
    <>
      <Head>
        <title>NextCart | Home</title>
      </Head>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.content}>
            <h1 className={styles.heading}>
              The hidden gems in fashion trends
            </h1>
            <p className={styles.description}>
              Step into the realm of unparalleled style with our unbeatable
              t-shirt trendsetter of today.
            </p>
            <div className={styles.buttons}>
              <Link href="/shop" className="mBtnPrimary">Shop All</Link>
              <Link href="/about" className="mBtnPrimary">Know More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.featured}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Featured Products</h2>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
            {(displayItems ?? store.getState().products.allItems)
              .slice(0, 8)
              .map((product) => (
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

          {(displayItems ?? store.getState().products.allItems).length > 8 && (
            <div className={styles.btnContainer}>
              <Link href="/shop" className="mBtnPrimary">View More</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
