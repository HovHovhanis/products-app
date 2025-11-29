"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useProductsStore } from "../../store/useProductsStore";
import styles from '../../styles/CreateProduct.module.css';


interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

interface FormState {
  title: string;
  description: string;
  image: string;
  price: string; // строка → потом преобразуем в number
}

export default function CreateProduct() {
  const addProduct = useProductsStore((s) => s.addProduct);
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    image: "",
    price: "",
  });

  // 🟦 типизированный обработчик без ошибок TS
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🟦 сабмит формы
  const submit = (e: FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.image)
      return alert("Заполните все поля");

    const newProduct: Product = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      image: form.image,
      price: Number(form.price),
    };

    addProduct(newProduct);

    router.push("/products");
  };

  return (
   <div className={styles.wrapper}>
      <button
        onClick={() => router.push("/products")}
        className={styles.backButton}
      >
        ⬅ Назад
      </button>
    <h1 className={styles.heading}>Создать продукт</h1>

    <form onSubmit={submit} className={styles.form}>
      <input
        name="title"
        placeholder="Название"
        value={form.title}
        onChange={handleChange}
        className={styles.input}
      />

      <input
        name="image"
        placeholder="URL картинки"
        value={form.image}
        onChange={handleChange}
        className={styles.input}
      />

      <input
        name="price"
        placeholder="Цена"
        value={form.price}
        onChange={handleChange}
        className={styles.input}
      />

      <textarea
        name="description"
        placeholder="Описание"
        value={form.description}
        onChange={handleChange}
        className={styles.textarea}
      />

      <button type="submit" className={styles.button}>
        Создать
      </button>
    </form>
  </div>
  );
}
