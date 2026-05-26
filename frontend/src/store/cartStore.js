import { create } from "zustand";

const CART_KEY = "@ajf:cart";

function resolveProductId(product) {
  return product?.id ?? product?._id ?? product?.productId ?? product?.codigo ?? null;
}

function loadInitialItems() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => {
        const id = resolveProductId(item);
        if (id == null) return null;
        return { ...item, id };
      })
      .filter((item) => item && typeof item === "object" && item.id != null && item.quantity > 0);
  } catch {
    return [];
  }
}

function persistItems(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function getTotalItems(items) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

const initialItems = loadInitialItems();

export const useCartStore = create((set) => ({
  items: initialItems,
  totalItems: getTotalItems(initialItems),

  addItem(product) {
    set((state) => {
      const productId = resolveProductId(product);
      if (productId == null) return state;

      const normalizedProduct = {
        ...product,
        id: productId,
        name: product.name ?? product.nome ?? product.title ?? "Produto",
        price: Number(product.price ?? product.preco ?? 0),
      };

      const existingIndex = state.items.findIndex((item) => String(item.id) === String(productId));
      let nextItems;

      if (existingIndex >= 0) {
        nextItems = state.items.map((item, index) =>
          index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        nextItems = [...state.items, { ...normalizedProduct, quantity: 1 }];
      }

      persistItems(nextItems);

      return {
        items: nextItems,
        totalItems: getTotalItems(nextItems),
      };
    });
  },

  removeItem(productId) {
    set((state) => {
      const nextItems = state.items
        .map((item) =>
          String(item.id) === String(productId)
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0);

      persistItems(nextItems);

      return {
        items: nextItems,
        totalItems: getTotalItems(nextItems),
      };
    });
  },

  deleteItem(productId) {
    set((state) => {
      const nextItems = state.items.filter((item) => String(item.id) !== String(productId));

      persistItems(nextItems);

      return {
        items: nextItems,
        totalItems: getTotalItems(nextItems),
      };
    });
  },

  clearCart() {
    persistItems([]);
    set({ items: [], totalItems: 0 });
  },
}));
