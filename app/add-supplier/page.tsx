"use client";

import { useState } from "react";
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
import { toast } from "sonner";

const formFields = [
  {
    id: "supplierCompany",
    label: "Supplier Company Name",
    type: "text",
  },
  {
    id: "firstName",
    label: "First Name",
    type: "text",
  },
  {
    id: "lastName",
    label: "Last Name",
    type: "text",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
  },
  {
    id: "phone",
    label: "Phone Number",
    type: "text",
  },
];

export default function AddSupplierPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      supplierCompany: formData.get("supplierCompany"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    };

    try {
      const res = await fetch("/api/add-supplier", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Supplier Added", {
          description: `Successfully added ${data.supplierCompany}.`,
        });
        form.reset();
      } else {
        toast.error("Failed to add supplier", {
          description: result.error || "Something went wrong.",
        });
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Request failed", {
        description: "Check your connection or try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center bg-slate-100 p-4 py-12 md:p-8">
      <Card className="w-full max-w-2xl rounded-2xl shadow-xl p-0">
        <CardHeader className="rounded-t-2xl bg-primary p-6">
          <CardTitle className="text-2xl font-bold text-white text-center">
            Add Supplier
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
                    name={field.id}
                    type={field.type}
                    className="md:col-span-2"
                    required
                  />
                </div>
              ))}
            </div>
            <CardFooter className="flex justify-end mt-6 p-0">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
