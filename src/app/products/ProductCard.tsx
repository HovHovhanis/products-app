"use client";

import { useRouter } from "next/navigation";
import { useProductsStore, Product } from "../../store/useProductsStore";
import styles from "../../styles/ProductsCard.module.css";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  const toggleLike = useProductsStore((s) => s.toggleLike);
  const favorites = useProductsStore((s) => s.favorites);
  const deleteProduct = useProductsStore((s) => s.deleteProduct);

  const isFav = favorites.includes(product.id);

  return (
    <div className={styles.card}>
      <div
        onClick={() => router.push(`/products/${product.id}`)}
        style={{ cursor: "pointer" }}
      >
        <Image
          src={product.image}
          width={200}
          height={200}
          alt={product.title}
          className={styles.image}
        />

        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.desc}>{product.description}</p>
      </div>

      <button
        onClick={() => toggleLike(product.id)}
        className={`${styles.icon} ${styles.like}`}
      >
        {isFav ? "❤️" : "🤍"}
      </button>

      <button
        onClick={() => deleteProduct(product.id)}
        className={`${styles.icon} ${styles.delete}`}
      >
        🗑
      </button>
    </div>
  );
}
