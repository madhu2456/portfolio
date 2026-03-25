import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Spinner({ className }: { className?: string }) {
  return (
    <Loader2
      className={cn(
        "flex min-h-screen items-center justify-center animate-spin",
        className,
      )}
    />
  );
}

export default Spinner;
