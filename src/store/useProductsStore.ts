import { create } from "zustand";

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

interface ProductsStore {
  products: Product[];
  favorites: number[];
  loading: boolean;

  fetchProducts: () => Promise<void>;
  toggleLike: (id: number) => void;
  deleteProduct: (id: number) => void;
  addProduct: (newProduct: Product) => void;
  updateProduct: (updated: Product) => void;
  getById: (id: number) => Product | undefined;
}

export const useProductsStore = create<ProductsStore>((set, get) => ({
  products: [],
  favorites: [],
  loading: false,

  fetchProducts: async () => {
    set({ loading: true });
    const res = await fetch("https://fakestoreapi.com/products");
    const data: Product[] = await res.json();
    set({ products: data, loading: false });
  },

  toggleLike: (id) =>
    set((state) => {
      const isFav = state.favorites.includes(id);
      return {
        favorites: isFav
          ? state.favorites.filter((f) => f !== id)
          : [...state.favorites, id],
      };
    }),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
      favorites: state.favorites.filter((f) => f !== id),
    })),

  addProduct: (newProduct) =>
    set((state) => ({
      products: [...state.products, newProduct],
    })),

  updateProduct: (updated) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === updated.id ? updated : p
      ),
    })),

  getById: (id) => get().products.find((p) => p.id === id),
}));
