import styles from "../styles/Pagintaion.module.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (newPage: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  return (
    <div className={styles.wrap}>
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className={styles.btn}
      >
        Назад
      </button>

      <span className={styles.page}>
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className={styles.btn}
      >
        Вперед
      </button>
    </div>
  );
}
