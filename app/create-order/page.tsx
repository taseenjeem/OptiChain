"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const formFields = [
  {
    id: "companyName",
    label: "Supplier Company Name",
    type: "text",
    placeholder: "Enter company name",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email address",
  },
  {
    id: "phone",
    label: "Phone number",
    type: "number",
    placeholder: "Enter phone number",
  },
  {
    id: "productName",
    label: "Product Name",
    type: "text",
    placeholder: "Enter product name",
  },
  {
    id: "quantity",
    label: "Quantity",
    type: "number",
    placeholder: "0",
  },
];

export default function CreateOrderPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    productName: "",
    quantity: "",
  });
  const { user } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          supplier_company: formData.companyName,
          email: formData.email,
          phone: formData.phone,
          product_name: formData.productName,
          qty: Number(formData.quantity),
        }),
      });

      if (res.ok) {
        toast.success("Order created successfully");
        setFormData({
          companyName: "",
          email: "",
          phone: "",
          productName: "",
          quantity: "",
        });
        if (user?.role === "admin") {
          router.push("/dashboard");
        } else {
          router.push("/supplies");
        }
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to create order");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex w-full items-center justify-center bg-slate-100 p-4 py-12 md:p-8">
      <Card className="w-full max-w-2xl rounded-2xl shadow-xl p-0">
        <CardHeader className="rounded-t-2xl bg-primary p-6">
          <CardTitle className="text-center text-2xl font-bold text-white">
            Create Order
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              {formFields.map((field) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 items-center gap-2 md:grid-cols-3 md:gap-4"
                >
                  <Label
                    htmlFor={field.id}
                    className="font-semibold md:text-right"
                  >
                    {field.label}
                    <span className="ml-1">:</span>
                  </Label>
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.id as keyof typeof formData]}
                    onChange={handleChange}
                    className="md:col-span-2"
                    required
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Order"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
