// lib/definitions.ts

// Define a clear type for your product.
export type Product = {
  id: string;
  name?: string | null;
  price?: number | null;
  currency?: string | null;
  stock?: number | null;
  order_status?: string | null;
  order_date?: string | null;
  updatedAt?: Date | null;
};

// Define a consistent page size
export const PAGE_SIZE = 20;
