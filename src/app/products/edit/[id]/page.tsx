"use client";

import { useProductsStore, Product } from "@/src/store/useProductsStore";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import styles from "../../../../styles/EditProduct.module.css";

interface FormState {
  title: string;
  image: string;
  price: string; 
  description: string;
}

export default function EditProduct() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = Number(params.id);

  const updateProduct = useProductsStore((s) => s.updateProduct);
  const product = useProductsStore((s) => s.getById(id));

  const [form, setForm] = useState<FormState>({
    title: "",
    image: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title,
        image: product.image,
        price: product.price.toString(),
        description: product.description,
      });
    }
  }, [product]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!product) return;

    const updatedProduct: Product = {
      id,
      title: form.title,
      image: form.image,
      price: Number(form.price),
      description: form.description,
    };

    updateProduct(updatedProduct);
    router.replace(`/products/${id}`);
  };

  if (!product) return <div>Продукт не найден</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Редактировать продукт</h1>

      <form onSubmit={submit} className={styles.form}>
        <input
          className={styles.field}
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Название"
        />
        <input
          className={styles.field}
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Ссылка на изображение"
        />
        <input
          className={styles.field}
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Цена"
        />
        <textarea
          className={`${styles.field} ${styles.textarea}`}
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Описание"
        />
        <button type="submit" className={styles.button}>Сохранить</button>
      </form>
    </div>
  );
}
