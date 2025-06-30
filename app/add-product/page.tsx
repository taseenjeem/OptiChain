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

export default function AddProductPage() {
  return (
    <div className="flex w-full items-center justify-center bg-slate-100 p-4 py-12 md:p-8">
      <Card className="w-full max-w-3xl rounded-2xl shadow-xl p-0">
        <CardHeader className="rounded-t-2xl bg-primary p-6">
          <CardTitle className="text-center text-2xl font-bold text-white">
            Add Product
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8 p-8">
          <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4">
            <Label htmlFor="companyName" className="font-semibold">
              Company Name:
            </Label>
            <Input
              id="companyName"
              className="md:col-span-3"
              type="text"
              placeholder="Enter company name"
            />
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-[auto_2fr_1fr_1fr] items-center gap-x-4">
              <div />
              <Label className="font-semibold text-slate-600">Item Name</Label>
              <Label className="font-semibold text-slate-600">
                Item Quantity
              </Label>
              <Label className="font-semibold text-slate-600">Unit Price</Label>
            </div>

            <div className="grid grid-cols-[auto_2fr_1fr_1fr] items-center gap-x-4">
              <span className="font-semibold">1.</span>
              <Input type="text" placeholder="Enter item name" />
              <Input type="number" placeholder="Enter quantity" min={1} />
              <Input type="number" placeholder="Enter unit price" min={1} />
            </div>

            <div className="grid grid-cols-[auto_2fr_1fr_1fr] items-center gap-x-4">
              <span className="font-semibold">2.</span>
              <Input type="text" placeholder="Enter item name" />
              <Input type="number" placeholder="Enter quantity" min={1} />
              <Input type="number" placeholder="Enter unit price" min={1} />
            </div>

            <div className="grid grid-cols-[auto_2fr_1fr_1fr] items-center gap-x-4">
              <span className="font-semibold">3.</span>
              <Input type="text" placeholder="Enter item name" />
              <Input type="number" placeholder="Enter quantity" />
              <Input type="number" placeholder="Enter unit price" />
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4">
            <Label className="font-semibold">Order Status:</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder="Select a status"
                  className="text-black"
                />
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
              id="date"
              type="date"
              defaultValue="26-06-2025"
              className="md:col-span-1"
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end border-t p-6">
          <Button>Add Product</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
