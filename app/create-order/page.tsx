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
    type: "tel",
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
  return (
    <div className="flex w-full items-center justify-center bg-slate-100 p-4 py-12 md:p-8">
      <Card className="w-full max-w-2xl rounded-2xl shadow-xl p-0">
        <CardHeader className="rounded-t-2xl bg-[#6E9E23] p-6">
          <CardTitle className="text-center text-2xl font-bold text-white">
            Create Order
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form>
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
                    className="md:col-span-2"
                  />
                </div>
              ))}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end border-t p-6">
          <Button className="bg-[#6E9E23] px-8 text-white hover:bg-[#5a831c]">
            Create
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
