import { StarFill, StarHalf, Star } from "react-bootstrap-icons";
import Link from 'next/link';
import styles from '@/styles/ProductCard.module.css';

interface ProductCardProps {
    id: number | string;
    category: string;
    image: string;
    name: string;
    rating: number;
    price: string;
}

export default function ProductCard({
    id,
    category,
    image,
    name,
    rating,
    price,
}: ProductCardProps) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
        <Link href={`/product/${id}`} className={styles.productCard}>
            <span className={styles.category}>{category}</span>

            <div className={styles.imageWrapper}>
                <img src={image} alt={name} className={styles.productImage} />
            </div>

            <div className={styles.productInfo}>
                <h3 className={styles.productName}>{name}</h3>
                <div className={styles.rating}>
                    {Array.from({ length: fullStars }).map((_, idx) => (
                        <StarFill key={`full-${idx}`} size={16} />
                    ))}

                    {halfStar === 1 && <StarHalf size={16} />}

                    {Array.from({ length: emptyStars }).map((_, idx) => (
                        <Star key={`empty-${idx}`} size={16} />
                    ))}

                    <span className={styles.ratingNumber}>({rating.toFixed(1)})</span>
                </div>
                <p className={styles.productPrice}>{price}</p>
            </div>
        </Link>
    );
}
