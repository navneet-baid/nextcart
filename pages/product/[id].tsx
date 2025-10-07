import { GetServerSideProps } from "next";
import Head from "next/head";
import styles from "@/styles/ProductDetail.module.css";
import { fetchProducts, Product } from "@/redux/productsSlice";
import { store } from "@/redux/store";
import { StarFill, StarHalf, Star } from "react-bootstrap-icons";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addToCart } from "@/redux/cartSlice";
import Toast from "@/components/Toast";


interface ProductDetailProps {
    product: Product;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.params?.id;
    await store.dispatch(fetchProducts());
    const allProducts = store.getState().products.allItems;
    const product = allProducts.find((p) => p.id.toString() === id);

    if (!product) {
        return { notFound: true };
    }

    return { props: { product } };
};

export default function ProductDetail({ product }: ProductDetailProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [quantity, setQuantity] = useState(1);
    const [showToast, setShowToast] = useState(false);
    const [btnText, setBtnText] = useState("Add to Cart");

    const handleAddToCart = () => {
        dispatch(addToCart({ product, quantity }));
        setBtnText("Added!");
        setShowToast(true);
        setTimeout(() => setBtnText("Add to Cart"), 3000);
    };

    const incrementQty = () => setQuantity(prev => prev + 1);
    const decrementQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const renderStars = (rate: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rate >= i) stars.push(<StarFill key={i} color="#ff9800" />);
            else if (rate >= i - 0.5) stars.push(<StarHalf key={i} color="#ff9800" />);
            else stars.push(<Star key={i} color="#ff9800" />);
        }
        return stars;
    };

    return (
        <>
            <Head>
                <title>NextCart | {product.title}</title>
            </Head>

            <section className={`${styles.container} container`}>
                <div className={styles.left}>
                    <div className={styles.imageWrapper}>
                        <Image src={product.image} width={850} height={850} alt={product.title} />
                    </div>
                </div>

                <div className={styles.right}>
                    <div className="mb-2">
                        {renderStars(product.rating.rate)}
                        <span className="ms-2">({product.rating.count})</span>
                    </div>

                    <h1 className={`${styles.title} mb-2`}>{product.title}</h1>
                    <p className={`${styles.price} mb-2`}>${product.price}</p>

                    <div className={`${styles.cartControls} mb-3`}>
                        <div className={styles.qty}>
                            <button type="button" onClick={decrementQty}>-</button>
                            <input type="text" value={quantity} readOnly />
                            <button type="button" onClick={incrementQty}>+</button>
                        </div>
                        <button className="mBtnPrimary" onClick={handleAddToCart} disabled={btnText === "Added!"}>
                            {btnText}
                        </button>
                    </div>

                    <Toast
                        message="Product added to cart!"
                        show={showToast}
                        onClose={() => setShowToast(false)}
                    />


                    <p className="mb-0">
                        <strong>Category:</strong> {product.category}
                    </p>

                    <p className="mb-0">{product.description}</p>
                </div>
            </section>

            <section className="container">
                <div className="row">
                    <div className="col-md-6 col-lg-4 text-center mb-4">
                        <Image src="/image/icon-1.svg" alt="icon" width={64} height={64} />
                        <h3 className="fs-5 my-3">Free Shipping</h3>
                        <p className="mb-0">
                            Enjoy free shipping on all orders, delivered straight to your doorstep at no extra cost.
                        </p>
                    </div>

                    <div className="col-md-6 col-lg-4 text-center mb-4">
                        <Image src="/image/icon-2.svg" alt="icon" width={64} height={64} />
                        <h3 className="fs-5 my-3">Fast Delivery</h3>
                        <p className="mb-0">
                            Receive your products quickly with our reliable and speedy delivery service.
                        </p>
                    </div>

                    <div className="col-md-6 col-lg-4 text-center mb-4">
                        <Image src="/image/icon-3.svg" alt="icon" width={64} height={64} />
                        <h3 className="fs-5 my-3">100% Quality Guarantee</h3>
                        <p className="mb-0">
                            We ensure top-quality products that meet your expectations, guaranteed every time.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
