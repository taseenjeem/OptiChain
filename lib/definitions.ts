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

export const PAGE_SIZE = 20;
