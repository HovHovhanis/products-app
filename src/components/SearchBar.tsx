'use client'

import { ChangeEvent } from "react";
import styles from "../styles/SearchBar.module.css";

interface SearchBarProps {
  onChange: (value: string) => void;
}

export default function SearchBar({ onChange }: SearchBarProps) {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      placeholder="Поиск товаров..."
      onChange={handleInput}
      className={styles.input}
    />
  );
}
