import Head from "next/head";
import styles from "@/styles/Cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { addToCart, removeFromCart } from "@/redux/cartSlice";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Cart() {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    const dispatch = useDispatch<AppDispatch>();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const incrementQty = (id: number) => {
        const item = cartItems.find(i => i.id === id);
        if (item) dispatch(addToCart({ product: item, quantity: 1 }));
    };

    const decrementQty = (id: number) => {
        const item = cartItems.find(i => i.id === id);
        if (item && item.quantity > 1) {
            dispatch(addToCart({ product: item, quantity: -1 }));
        }
    };

    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id));
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            <Head>
                <title>NextCart | Cart</title>
            </Head>

            <section className={styles.heroSection}>
                <div className="container h-100 d-flex flex-column justify-content-center align-items-center">
                    <h1 className={styles.title}>Your Cart</h1>
                    <nav aria-label="breadcrumb">
                        <ol className={`breadcrumb ${styles.breadcrumb}`}>
                            <li className="breadcrumb-item">
                                <Link href="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Cart
                            </li>
                        </ol>
                    </nav>
                </div>
            </section>
            {isClient && (
                <section>
                    <div className="container">
                        {cartItems.length === 0 ? (
                            <p className="text-center">Your cart is empty.</p>
                        ) : (
                            <div className="row g-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className="col-12 d-flex align-items-center border rounded p-3">
                                        <div className="me-3" style={{ width: "100px", height: "100px", flexShrink: 0 }}>
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                width={100}
                                                height={100}
                                                className="rounded"
                                            />
                                        </div>

                                        <div className="flex-grow-1">
                                            <h5 className={`mb-1 ${styles.productTitle}`}>{item.title}</h5>
                                            <p className="mb-1">Price: ${item.price}</p>

                                            <div className="d-flex align-items-center mb-2">
                                                <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => decrementQty(item.id)}>-</button>
                                                <input type="text" value={item.quantity} readOnly className="form-control form-control-sm text-center" style={{ width: "50px" }} />
                                                <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => incrementQty(item.id)}>+</button>
                                            </div>

                                            <button className="btn btn-sm btn-danger" onClick={() => handleRemove(item.id)}>Remove</button>
                                        </div>

                                        <div className="ms-3 text-end">
                                            <p className="mb-0 fw-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}

                                <div className="col-12 mt-4 text-end">
                                    <h4>Total: ${totalPrice.toFixed(2)}</h4>
                                    <button className="mBtnSecondary">Proceed to Checkout</button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </>
    );
}
