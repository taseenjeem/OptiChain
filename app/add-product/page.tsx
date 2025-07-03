"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Check, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

type ProductField = "name" | "quantity" | "price";

interface Product {
  name: string;
  quantity: string;
  price: string;
}

export default function AddProductPage() {
  const [companyName, setCompanyName] = useState("");
  const [products, setProducts] = useState<Product[]>([
    { name: "", quantity: "", price: "" },
    { name: "", quantity: "", price: "" },
    { name: "", quantity: "", price: "" },
  ]);
  const [orderStatus, setOrderStatus] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [companyValid, setCompanyValid] = useState(false);
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [checked, setChecked] = useState<null | boolean>(null);
  const { user } = useAuth();
  const router = useRouter();

  const handleCompanyBlur = async () => {
    if (!companyName) return;

    setChecking(true);
    setChecked(null);

    try {
      const res = await fetch(`/api/check-company?company=${companyName}`);
      const data = await res.json();

      if (data.exists) {
        setCompanyValid(true);
        setChecked(true);
        toast.success("Supplier found. You may proceed.");
      } else {
        setCompanyValid(false);
        setChecked(false);
        toast.error("This supplier does not exist. Please add it first.");
        if (user?.role === "admin") {
          router.push("/dashboard");
        } else {
          router.push("/supplies");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Error checking supplier.");
      setCompanyValid(false);
      setChecked(false);
    } finally {
      setChecking(false);
    }
  };

  const handleInputChange = (
    index: number,
    key: ProductField,
    value: string
  ) => {
    const updated = [...products];
    updated[index][key] = value;
    setProducts(updated);
  };

  const resetForm = () => {
    setCompanyName("");
    setProducts([
      { name: "", quantity: "", price: "" },
      { name: "", quantity: "", price: "" },
      { name: "", quantity: "", price: "" },
    ]);
    setOrderStatus("");
    setOrderDate("");
    setCompanyValid(false);
    setChecked(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyValid) {
      return toast.error("Supplier not verified.");
    }

    const validProducts = products.filter(
      (p) => p.name && p.quantity && p.price
    );

    if (validProducts.length === 0) {
      return toast.error("At least one product is required.");
    }

    const formattedDate = new Date(orderDate)
      .toLocaleDateString("en-GB")
      .replace(/\//g, "/");

    const entries = validProducts.map((p) => ({
      name: p.name,
      price: Number(p.price),
      currency: "USD",
      stock: Number(p.quantity),
      order_status: orderStatus,
      order_date: formattedDate,
    }));

    try {
      setSubmitting(true);

      const res = await fetch("/api/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: entries }),
      });

      if (res.ok) {
        toast.success("Products added successfully.");
        resetForm();
      } else {
        toast.error("Failed to add products.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center bg-slate-100 p-4 py-12 md:p-8">
      <Card className="w-full max-w-3xl rounded-2xl shadow-xl p-0">
        <CardHeader className="rounded-t-2xl bg-primary p-6">
          <CardTitle className="text-center text-2xl font-bold text-white">
            Add Product
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-8 p-8">
            <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4">
              <Label htmlFor="companyName" className="font-semibold">
                Company Name:
              </Label>
              <div className="relative flex items-center md:col-span-3">
                <Input
                  id="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                    setCompanyValid(false);
                    setChecked(null);
                  }}
                  onBlur={handleCompanyBlur}
                  required
                  placeholder="Enter company name"
                  className="pr-10"
                />
                <div className="absolute right-3">
                  {checking && (
                    <Loader2 className="animate-spin text-muted-foreground w-5 h-5" />
                  )}
                  {!checking && checked === true && (
                    <Check className="text-green-500 w-5 h-5" />
                  )}
                  {!checking && checked === false && (
                    <X className="text-red-500 w-5 h-5" />
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-[auto_2fr_1fr_1fr] items-center gap-x-4">
                <div />
                <Label className="font-semibold text-slate-600">
                  Item Name
                </Label>
                <Label className="font-semibold text-slate-600">Quantity</Label>
                <Label className="font-semibold text-slate-600">
                  Unit Price
                </Label>
              </div>

              {products.map((product, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[auto_2fr_1fr_1fr] items-center gap-x-4"
                >
                  <span className="font-semibold">{i + 1}.</span>
                  <Input
                    type="text"
                    placeholder="Product name"
                    value={product.name}
                    onChange={(e) =>
                      handleInputChange(i, "name", e.target.value)
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Quantity"
                    min={1}
                    value={product.quantity}
                    onChange={(e) =>
                      handleInputChange(i, "quantity", e.target.value)
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Price"
                    min={1}
                    value={product.price}
                    onChange={(e) =>
                      handleInputChange(i, "price", e.target.value)
                    }
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4">
              <Label className="font-semibold">Order Status:</Label>
              <Select
                required
                onValueChange={(val) => setOrderStatus(val)}
                value={orderStatus}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="received">Received</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4">
              <Label htmlFor="date" className="font-semibold">
                Date:
              </Label>
              <Input
                required
                id="date"
                type="date"
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
                className="md:col-span-1"
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end border-t p-6">
            <Button type="submit" disabled={!companyValid || submitting}>
              {submitting ? "Adding..." : "Add Product"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
