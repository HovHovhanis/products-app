"use client";

import { useEffect, useState } from "react";
import { useProductsStore, Product } from "../../store/useProductsStore";
import { useRouter } from "next/navigation";

import styles from "../../styles/ProductsPage.module.css";
import SearchBar from "@/src/components/SearchBar";
import Pagination from "@/src/components/Pagintation";
import ProductCard from "./ProductCard";

type Filter = "all" | "favorites";

export default function ProductsPage() {
  const { fetchProducts, products, loading, favorites } = useProductsStore();
  const router = useRouter();
  
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const PER_PAGE = 8;

 
  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [fetchProducts, products.length]);

  if (loading) return <div className={styles.loading}>Загрузка...</div>;


  let list: Product[] = [...products];

  if (filter === "favorites") {
    list = list.filter((p) => favorites.includes(p.id));
  }

  if (search.trim()) {
    list = list.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }


  const totalPages = Math.ceil(list.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const paginated = list.slice(start, start + PER_PAGE);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Products</h1>

      <div className={styles.filters}>
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? styles.activeBtn : styles.btn}
        >
          Все
        </button>

        <button
          onClick={() => setFilter("favorites")}
          className={filter === "favorites" ? styles.activeBtn : styles.btn}
        >
          Избранное ({favorites.length})
        </button>
         <button
          onClick={() => router.push("/create-products")}
          className={styles.createBtn}
          >
          ➕ Создать продукт
        </button>
      </div>

      <SearchBar onChange={setSearch} />

      <div className={styles.grid}>
        {paginated.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
