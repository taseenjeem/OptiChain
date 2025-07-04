"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Product = {
  id: string;
  name: string;
  stock: number;
};

export function ReOrderSoon() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLowStockProducts = async () => {
      try {
        const res = await fetch("/api/products/low-stock");

        if (!res.ok) {
          throw new Error(`Failed with status ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Unexpected response format");
        }

        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch low stock products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLowStockProducts();
  }, []);

  if (loading) {
    return <p className="my-6 text-sm text-muted-foreground">Loading...</p>;
  }

  if (products.length === 0) {
    return (
      <p className="my-6 text-sm text-muted-foreground">
        No products need reordering.
      </p>
    );
  }

  return (
    <div className="w-full my-16">
      <h2 className="text-xl font-semibold mb-4">Re-Order Soon!</h2>
      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-1/2 md:basis-1/3 lg:basis-1/5"
            >
              <div className="p-1">
                <Card className="shadow-sm hover:shadow-md transition-shadow h-32">
                  <CardContent className="flex items-center justify-center h-full">
                    <span className="text-sm font-medium">{product.name}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
