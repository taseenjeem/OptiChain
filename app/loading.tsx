import { Loader2 } from "lucide-react";

export default function loading() {
  return (
    <>
      <div className="fixed inset-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
        <Loader2 className="h-16 w-16 animate-spin" aria-label="Loading" />
        <p className="mt-4 text-lg font-medium text-foreground">Loading...</p>
      </div>
    </>
  );
}
