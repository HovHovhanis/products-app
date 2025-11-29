"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useProductsStore } from "@/src/store/useProductsStore";
import styles from "../../../styles/ProductsPage.module.css";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const id = Number(params.id);
  const product = useProductsStore((s) => s.getById(id));

  if (!product) return <div>Продукт не найден</div>;

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.backBtn}
        onClick={() => {
          if (window.history.length > 2) {
            router.back();
          } else {
            router.push("/products");
          }
        }}
      >
        ⬅ Назад
      </button>

      <h1 className={styles.productTitle}>{product.title}</h1>

      <Image
        src={product.image}
        width={500}
        height={500}
        alt={product.title}
      />

      <p className={styles.productDescription}>{product.description}</p>

      <button
        className={styles.editBtn}
        onClick={() => router.push(`/products/edit/${id}`)}
      >
        ✏️ Редактировать
      </button>
    </div>
  );
}
